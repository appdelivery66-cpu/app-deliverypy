import { INITIAL_DATA } from '@/lib/data';
import fs from 'fs';
import path from 'path';

const DB_FILE_PATH = path.join(process.cwd(), 'data.json');

export async function getData() {
    const GIST_ID = process.env.GIST_ID;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    // 1. Tenta pegar do Gist se configurado (Prioridade para Nuvem)
    if (GIST_ID && GITHUB_TOKEN) {
        try {
            const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                },
                cache: 'no-store'
            });

            if (response.ok) {
                const gist = await response.json();
                const file = gist.files['data.json'];
                if (file && file.content) {
                    const gistData = JSON.parse(file.content);
                    if (gistData.products && gistData.store) {
                        return { ...INITIAL_DATA, ...gistData };
                    }
                }
            }
        } catch (error) {
            console.error("Erro ao buscar do Gist:", error);
        }
    }

    // 2. Fallback: Tenta pegar do arquivo local data.json
    if (fs.existsSync(DB_FILE_PATH)) {
        try {
            const fileContent = fs.readFileSync(DB_FILE_PATH, 'utf-8');
            const localData = JSON.parse(fileContent);
            return { ...INITIAL_DATA, ...localData };
        } catch (error) {
            console.error("Erro ao ler banco local:", error);
        }
    }

    // 3. Se nada existir, retorna dados iniciais
    return INITIAL_DATA;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function saveData(newData: any): Promise<{ success: boolean; message: string }> {
    const GIST_ID = process.env.GIST_ID;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    let gistError = null;

    // 1. Tenta salvar no Gist se configurado (Prioridade para Nuvem)
    if (GIST_ID && GITHUB_TOKEN) {
        try {
            const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    files: {
                        'data.json': {
                            content: JSON.stringify(newData, null, 2)
                        }
                    }
                })
            });

            if (response.ok) {
                // Sincroniza também com o arquivo local para manter o fallback atualizado
                try {
                    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(newData, null, 2));
                } catch (e) {
                    console.error("Erro ao atualizar backup local durante sincronia:", e);
                }
                return { success: true, message: "¡Guardado en la Nube con éxito!" };
            } else {
                gistError = `Erro Gist (${response.status})`;
            }
        } catch (error: any) {
            console.error("Erro ao salvar no Gist:", error);
            gistError = `Sem Conexão Cloud: ${error.message}`;
        }
    }

    // 2. Fallback: Se o Gist falhar ou não estiver configurado, salva localmente em data.json
    try {
        // Se estivermos na Vercel (Produção Online), avisar que o backup local é temporário
        if (process.env.NODE_ENV === 'production' && !GIST_ID) {
            return { success: false, message: "Erro: Na Vercel (Online), é OBRIGATÓRIO configurar o GIST_ID para salvar permanentemente." };
        }

        fs.writeFileSync(DB_FILE_PATH, JSON.stringify(newData, null, 2));
        return {
            success: true,
            message: gistError ? `Modo Offline: ${gistError}. ¡Guardado Localmente!` : "¡Guardado localmente con éxito!"
        };
    } catch (error: any) {
        console.error("Erro ao salvar localmente:", error);
        return { success: false, message: `Erro fatal ao salvar: ${error.message}` };
    }
}

"use client";

import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, LayoutDashboard, Utensils, Settings, LogOut, ChevronRight, Upload, ImageIcon, X, Images, ShoppingCart, Clock, MapPin, Monitor, Search, CreditCard, Banknote, User, Phone, Ticket, BarChart3, PieChart, DollarSign, TrendingUp, MessageCircle, Menu, ImagePlus, Calculator, Unlock, Lock, Power, Play, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product, Category, StoreConfig } from '@/lib/data';
import { BRANDING } from '@/lib/branding';

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'home' | 'orders' | 'products' | 'categories' | 'config' | 'banners' | 'coupons' | 'analytics' | 'pdv' | 'cash'>('home');
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [printableOrder, setPrintableOrder] = useState<any>(null);
    const [printType, setPrintType] = useState<'kitchen' | 'customer' | null>(null);
    const [activeAdminCategory, setActiveAdminCategory] = useState<string>("all");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState<string | null>(null);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const lastOrderCount = React.useRef<number>(0);

    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [lockError, setLockError] = useState(false);
    const [cashierModal, setCashierModal] = useState({ show: false, initialValue: 0 });

    // PDV States
    const [pdvCart, setPdvCart] = useState<any[]>([]);
    const [pdvSearch, setPdvSearch] = useState("");
    const [pdvCustomer, setPdvCustomer] = useState<any>({ name: "", phone: "", address: "", neighborhood: "", payment: "Efectivo" });
    const [pdvCategory, setPdvCategory] = useState<string | null>(null);
    const [pdvObservation, setPdvObservation] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // CONTRASEÑA DEFINIDA AQUÍ: "KARPA4545"
        if (passwordInput === "KARPA4545") {
            setIsAuthenticated(true);
        } else {
            setLockError(true);
            setTimeout(() => setLockError(false), 2000);
        }
    };

    const fetchOrders = (isPolling = false) => {
        if (!isPolling) setLoading(true);
        fetch('/api/data')
            .then(res => res.json())
            .then(json => {
                setData(json);
                if (!isPolling) setLoading(false);
            })
            .catch(() => {
                if (!isPolling) setLoading(false);
            });
    };

    // Polling de pedidos (cada 30 segundos)
    useEffect(() => {
        const interval = setInterval(() => {
            if (activeTab === 'products' || activeTab === 'config' || activeTab === 'categories' || activeTab === 'coupons' || saving) {
                console.log("Polling pausado durante edición o guardado.");
                return;
            }
            fetchOrders(true);
        }, 30000);

        const unlockAudio = () => {
            const audio = new Audio('data:audio/wav;base64,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');
            audio.volume = 0.01;
            audio.play().then(() => {
                console.log("Audio desbloqueado");
                window.removeEventListener('click', unlockAudio);
            }).catch(() => { });
        };
        window.addEventListener('click', unlockAudio);

        return () => {
            clearInterval(interval);
            window.removeEventListener('click', unlockAudio);
        };
    }, [activeTab, saving]);

    // Efecto para disparar la impresión justo después de la renderización del recibo
    useEffect(() => {
        if (printableOrder && printType) {
            console.log(`Iniciando impresión del pedido #${printableOrder.id} - Tipo: ${printType}`);
            const timer = setTimeout(() => {
                window.print();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [printableOrder, printType]);

    useEffect(() => {
        if (data?.orders && data.orders.length > lastOrderCount.current) {
            if (lastOrderCount.current > 0 && soundEnabled) {
                try {
                    const audio = new Audio('data:audio/wav;base64,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');
                    audio.volume = 0.8;
                    audio.play().catch(() => {
                        console.log("Sonido bloqueado por el navegador. Haga clic en cualquier lugar para activar.");
                    });
                } catch (e) {
                    console.log("Error al reproducir sonido:", e);
                }
            }
            lastOrderCount.current = data.orders.length;
        }
    }, [data, soundEnabled]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateCategory = (id: string, name: string) => {
        setData((prev: any) => ({
            ...prev,
            categories: prev.categories.map((c: Category) => c.id === id ? { ...c, name } : c)
        }));
    };

    const addCategory = () => {
        const newCat: Category = {
            id: Math.random().toString(36).substr(2, 9),
            name: "Nueva Categoría",
            icon: "Utensils"
        };
        setData((prev: any) => ({ ...prev, categories: [...prev.categories, newCat] }));
    };

    const deleteCategory = (id: string) => {
        if (confirm("¿Está seguro? Esto puede afectar los productos vinculados a esta categoría.")) {
            setData((prev: any) => ({
                ...prev,
                categories: prev.categories.filter((c: Category) => c.id !== id)
            }));
        }
    };

    const handleImageUpload = async (file: File, path: string, callback: (url: string) => void) => {
        const formData = new FormData();
        formData.append('file', file);

        setUploading(path);
        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || 'Falla en la carga');
            }

            const result = await res.json();
            callback(result.url);
        } catch (error: any) {
            alert(`Aviso: ${error.message}\n\nConsejo: Copie el enlace de la imagen y péguelo directamente en el campo de texto.`);
        } finally {
            setUploading(null);
        }
    };

    const handleSave = async (customData?: any) => {
        setSaving(true);
        try {
            const res = await fetch('/api/data', {
                method: 'POST',
                body: JSON.stringify(customData || data),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                alert("¡Cambios guardados con éxito!");
            } else {
                const errorData = await res.json().catch(() => ({ message: res.statusText }));
                alert(`Error al guardar: ${errorData.message || "Error desconocido"}`);
            }
        } catch (error: any) {
            console.error("Save error:", error);
            alert(`Error de conexión: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    const addToPdvCart = (product: Product) => {
        setPdvCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1, observation: "" }];
        });
    };

    const updatePdvQuantity = (id: string, delta: number) => {
        setPdvCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(0, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const finishPdvSale = () => {
        if (pdvCart.length === 0) {
            alert("¡El carrito está vacío!");
            return;
        }

        const total = pdvCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        const newOrder = {
            id: Math.floor(Math.random() * 10000).toString(),
            date: new Date().toLocaleString('es-ES'),
            status: 'Entregado',
            total: total,
            payment: pdvCustomer.payment,
            items: pdvCart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                observation: item.observation
            })),
            customer: {
                name: pdvCustomer.name || "Cliente Mostrador",
                phone: pdvCustomer.phone,
                address: pdvCustomer.address || "Retiro en Local",
                neighborhood: pdvCustomer.neighborhood
            },
            type: 'PDV',
            observation: pdvObservation
        };

        const updatedProducts = data.products.map((p: Product) => {
            const cartItem = pdvCart.find(item => item.id === p.id);
            if (cartItem && p.trackStock) {
                return { ...p, stock: Math.max(0, (p.stock || 0) - cartItem.quantity) };
            }
            return p;
        });

        const newOrders = [newOrder, ...(data.orders || [])];
        const newData = { ...data, orders: newOrders, products: updatedProducts };
        setData(newData);
        handleSave(newData);

        setPdvCart([]);
        setPdvCustomer({ name: "", phone: "", address: "", neighborhood: "", payment: "Efectivo" });
        setPdvObservation("");
        alert("¡Venta registrada con éxito!");
    };

    const updateOrderStatus = (orderId: string, newStatus: string) => {
        const newOrders = data.orders.map((o: any) => o.id === orderId ? { ...o, status: newStatus } : o);
        const newData = { ...data, orders: newOrders };
        setData(newData);
        handleSave(newData);
        if (selectedOrder?.id === orderId) {
            setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
    };

    const updateProduct = (id: string, field: string, value: any) => {
        setData((prev: any) => ({
            ...prev,
            products: prev.products.map((p: Product) => p.id === id ? { ...p, [field]: value } : p)
        }));
    };

    const addProduct = () => {
        const newProduct: Product = {
            id: Math.random().toString(36).substr(2, 9),
            name: "Nuevo Producto",
            description: "Descripción aquí",
            price: 0,
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
            category: activeAdminCategory === "all" ? data?.categories?.[0]?.id : activeAdminCategory,
            available: true
        };
        setData((prev: any) => ({ ...prev, products: [...prev.products, newProduct] }));
    };

    const deleteProduct = (id: string) => {
        if (confirm("¿Está seguro de que desea eliminarlo?")) {
            setData((prev: any) => ({
                ...prev,
                products: prev.products.filter((p: Product) => p.id !== id)
            }));
        }
    };

    const addProductExtra = (productId: string) => {
        const newExtra = {
            id: Math.random().toString(36).substr(2, 9),
            name: "Nuevo Adicional",
            price: 0
        };
        setData((prev: any) => ({
            ...prev,
            products: prev.products.map((p: Product) =>
                p.id === productId ? { ...p, extras: [...(p.extras || []), newExtra] } : p
            )
        }));
    };

    const updateProductExtra = (productId: string, extraId: string, field: string, value: any) => {
        setData((prev: any) => ({
            ...prev,
            products: prev.products.map((p: Product) =>
                p.id === productId ? {
                    ...p,
                    extras: p.extras?.map(e => e.id === extraId ? { ...e, [field]: value } : e) || []
                } : p
            )
        }));
    };

    const deleteProductExtra = (productId: string, extraId: string) => {
        setData((prev: any) => ({
            ...prev,
            products: prev.products.map((p: Product) =>
                p.id === productId ? {
                    ...p,
                    extras: p.extras?.filter(e => e.id !== extraId) || []
                } : p
            )
        }));
    };

    const addCoupon = () => {
        const newCoupon = { code: "BIENVENIDO", discount: 10, type: 'percent' as const };
        setData((prev: any) => ({
            ...prev,
            store: { ...prev.store, coupons: [...(prev.store.coupons || []), newCoupon] }
        }));
    };

    const updateCoupon = (index: number, field: string, value: any) => {
        setData((prev: any) => {
            const newCoupons = [...(prev.store.coupons || [])];
            newCoupons[index] = { ...newCoupons[index], [field]: value };
            return { ...prev, store: { ...prev.store, coupons: newCoupons } };
        });
    };

    const deleteCoupon = (index: number) => {
        setData((prev: any) => {
            const newCoupons = prev.store.coupons.filter((_: any, i: number) => i !== index);
            return { ...prev, store: { ...prev.store, coupons: newCoupons } };
        });
    };

    const handleOpenCashier = (initialBalance: number) => {
        const newStatus = {
            isOpen: true,
            openingTime: new Date().toLocaleString('es-ES'),
            initialBalance,
            currentBalance: initialBalance
        };
        const newData = { ...data, store: { ...data.store, cashierStatus: newStatus } };
        setData(newData);
        handleSave(newData);
    };

    const handleCloseCashier = () => {
        if (confirm("¿Realmente desea cerrar la caja?")) {
            const newStatus = {
                ...(data?.store?.cashierStatus || {}),
                isOpen: false,
                closingTime: new Date().toLocaleString('es-ES')
            };
            const newData = { ...data, store: { ...data?.store, cashierStatus: newStatus } };
            setData(newData);
            handleSave(newData);
            alert(`¡Caja cerrada con éxito! Saldo Final: ${(data?.store?.cashierStatus?.currentBalance || 0).toFixed(2)}`);
        }
    };

    // --- RENDER SAFETY WRAPPER ---
    try {
        if (loading) return (
            <div className="min-h-screen flex items-center justify-center bg-muted/20">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );

        if (!isAuthenticated) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
                    <form onSubmit={handleLogin} className="bg-white w-full max-w-sm p-8 rounded-3xl shadow-2xl space-y-6">
                        <div className="text-center space-y-2">
                            <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Utensils className="w-8 h-8 text-primary" />
                            </div>
                            <h1 className="font-bold text-2xl text-slate-800">Panel del Restaurante</h1>
                            <p className="text-slate-500 text-sm">Ingrese su contraseña para acceder</p>
                        </div>

                        <div className="space-y-2">
                            <input
                                type="password"
                                autoFocus
                                placeholder="Contraseña de acceso"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                className={cn(
                                    "w-full bg-slate-50 border-2 rounded-2xl p-4 font-bold text-center text-lg outline-none transition-all placeholder:font-normal",
                                    lockError ? "border-red-500 bg-red-50 text-red-500 animate-shake" : "border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/10"
                                )}
                            />
                            {lockError && <p className="text-xs text-center text-red-500 font-bold">Contraseña incorrecta</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-white h-14 rounded-2xl font-bold text-lg hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            );
        }

        if (!data || !data.store) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
                    <div className="bg-red-50 text-red-500 p-6 rounded-3xl mb-4">
                        <X className="w-12 h-12 mx-auto mb-2" />
                        <h2 className="font-bold text-xl">Error al cargar datos</h2>
                    </div>
                    <p className="text-slate-500 mb-6 max-w-md">No fue posible conectar con la base de datos o los datos están incompletos.
                        <br /><span className="text-xs mt-2 block opacity-70">Detalle: {JSON.stringify(data).substring(0, 50)}</span>
                    </p>
                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }}
                        className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all"
                    >
                        Intentar de Nuevo
                    </button>
                </div>
            );
        }

        return (
            <>
                <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row font-sans relative no-print">
                    {/* Header Mobile */}
                    <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-[60] shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-xs">AD</div>
                            <h1 className="font-black text-lg tracking-tight uppercase">Panel App</h1>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-white/10 rounded-xl transition-all"
                        >
                            {isSidebarOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Overlay para cerrar el menú en móvil */}
                    {isSidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] md:hidden animate-in fade-in duration-300"
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    )}

                    {/* Sidebar */}
                    <aside className={cn(
                        "fixed inset-y-0 left-0 bg-slate-900 text-white p-6 flex flex-col gap-8 shadow-xl transition-all duration-300 z-[55] w-64 md:relative md:translate-x-0 md:flex shrink-0",
                        isSidebarOpen ? "translate-x-0 flex" : "-translate-x-full hidden md:flex"
                    )}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-black">AD</div>
                            <h1 className="font-black text-xl tracking-tight uppercase">Panel App</h1>
                        </div>

                        <nav className="flex flex-col gap-2 flex-1 overflow-y-auto no-scrollbar">
                            <button
                                onClick={() => { setActiveTab('home'); setIsSidebarOpen(false); }}
                                className={cn(
                                    "flex items-center gap-3 p-4 rounded-2xl transition-all font-bold group text-sm",
                                    activeTab === 'home' ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                                )}
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                Inicio
                                <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", activeTab === 'home' ? "rotate-90" : "")} />
                            </button>
                            <button
                                onClick={() => { setActiveTab('orders'); setIsSidebarOpen(false); }}
                                className={cn(
                                    "flex items-center gap-3 p-4 rounded-2xl transition-all font-bold group text-sm",
                                    activeTab === 'orders' ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                                )}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Pedidos
                                <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", activeTab === 'orders' ? "rotate-90" : "")} />
                            </button>
                            <button
                                onClick={() => { setActiveTab('pdv'); setIsSidebarOpen(false); }}
                                className={cn(
                                    "flex items-center gap-3 p-4 rounded-2xl transition-all font-bold group text-sm",
                                    activeTab === 'pdv' ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                                )}
                            >
                                <Monitor className="w-5 h-5" />
                                Punto de Venta
                                <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", activeTab === 'pdv' ? "rotate-90" : "")} />
                            </button>
                            <button
                                onClick={() => { setActiveTab('products'); setIsSidebarOpen(false); }}
                                className={cn(
                                    "flex items-center gap-3 p-4 rounded-2xl transition-all font-bold group text-sm",
                                    activeTab === 'products' ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                                )}
                            >
                                <Utensils className="w-5 h-5" />
                                Menú
                                <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", activeTab === 'products' ? "rotate-90" : "")} />
                            </button>
                            <button
                                onClick={() => { setActiveTab('categories'); setIsSidebarOpen(false); }}
                                className={cn(
                                    "flex items-center gap-3 p-4 rounded-2xl transition-all font-bold group text-sm",
                                    activeTab === 'categories' ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                                )}
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                Categorías
                                <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", activeTab === 'categories' ? "rotate-90" : "")} />
                            </button>
                            <button
                                onClick={() => { setActiveTab('config'); setIsSidebarOpen(false); }}
                                className={cn(
                                    "flex items-center gap-3 p-4 rounded-2xl transition-all font-bold group text-sm",
                                    activeTab === 'config' ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                                )}
                            >
                                <Settings className="w-5 h-5" />
                                Configuración
                                <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", activeTab === 'config' ? "rotate-90" : "")} />
                            </button>
                            <button
                                onClick={() => { setActiveTab('banners'); setIsSidebarOpen(false); }}
                                className={cn(
                                    "flex items-center gap-3 p-4 rounded-2xl transition-all font-bold group text-sm",
                                    activeTab === 'banners' ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                                )}
                            >
                                <Images className="w-5 h-5" />
                                Banners
                                <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", activeTab === 'banners' ? "rotate-90" : "")} />
                            </button>
                            <button
                                onClick={() => { setActiveTab('coupons'); setIsSidebarOpen(false); }}
                                className={cn(
                                    "flex items-center gap-3 p-4 rounded-2xl transition-all font-bold group text-sm",
                                    activeTab === 'coupons' ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                                )}
                            >
                                <Ticket className="w-5 h-5" />
                                Cupones
                                <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", activeTab === 'coupons' ? "rotate-90" : "")} />
                            </button>
                            <button
                                onClick={() => { setActiveTab('analytics'); setIsSidebarOpen(false); }}
                                className={cn(
                                    "flex items-center gap-3 p-4 rounded-2xl transition-all font-bold group text-sm",
                                    activeTab === 'analytics' ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                                )}
                            >
                                <BarChart3 className="w-5 h-5" />
                                Reportes
                                <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", activeTab === 'analytics' ? "rotate-90" : "")} />
                            </button>
                            <button
                                onClick={() => { setActiveTab('cash'); setIsSidebarOpen(false); }}
                                className={cn(
                                    "flex items-center gap-3 p-4 rounded-2xl transition-all font-bold group text-sm",
                                    activeTab === 'cash' ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                                )}
                            >
                                <Calculator className="w-5 h-5" />
                                Caja
                                <ChevronRight className={cn("ml-auto w-4 h-4 transition-transform", activeTab === 'cash' ? "rotate-90" : "")} />
                            </button>
                        </nav>


                        <button className="flex items-center gap-3 p-4 rounded-2xl opacity-40 hover:opacity-100 hover:bg-red-500/10 text-red-400 font-bold transition-all mt-auto border-t border-white/5 pt-6">
                            <LogOut className="w-5 h-5" /> Salir
                        </button>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 p-4 md:p-10 overflow-y-auto w-full no-scrollbar relative animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Status bar & Stats Quick View */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                                    ¡Hola, Administrador! 👋
                                </h2>
                                <p className="text-slate-500 font-medium mt-1">Aquí tienes lo que está pasando hoy en {data.store.name}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 shadow-sm transition-all",
                                    data?.store?.cashierStatus?.isOpen
                                        ? "bg-green-500 text-white shadow-green-500/20"
                                        : "bg-red-500 text-white shadow-red-500/20"
                                )}>
                                    <Clock className="w-4 h-4" />
                                    {data?.store?.cashierStatus?.isOpen ? 'Caja Abierta' : 'Caja Cerrada'}
                                </div>
                                <button
                                    onClick={() => handleSave()}
                                    disabled={saving}
                                    className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-wider hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2 active:scale-95 disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4 text-primary" />
                                    {saving ? 'Guardando...' : 'Guardar Todo'}
                                </button>
                            </div>
                        </div>

                        {
                            activeTab === 'home' && (
                                <div className="space-y-8 animate-in fade-in duration-500">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 group hover:shadow-xl hover:shadow-primary/5 transition-all">
                                            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <ShoppingCart className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Pedidos Hoy</h3>
                                            <p className="text-3xl font-black text-slate-800">
                                                {data.orders.filter((o: any) => o.date.includes(new Date().toLocaleDateString('es-ES'))).length}
                                            </p>
                                        </div>
                                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 group hover:shadow-xl hover:shadow-primary/5 transition-all">
                                            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <DollarSign className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Ventas Hoy</h3>
                                            <p className="text-3xl font-black text-slate-800">
                                                Gs. {data.orders
                                                    .filter((o: any) => o.date.includes(new Date().toLocaleDateString('es-ES')))
                                                    .reduce((acc: number, o: any) => acc + o.total, 0)
                                                    .toLocaleString('es-ES')}
                                            </p>
                                        </div>
                                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 group hover:shadow-xl hover:shadow-primary/5 transition-all">
                                            <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <Clock className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Ticket Promedio</h3>
                                            <p className="text-3xl font-black text-slate-800">
                                                Gs. {((data.orders.reduce((acc: number, o: any) => acc + o.total, 0) / (data.orders.length || 1))).toLocaleString('es-ES', { maximumFractionDigits: 0 })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Centro de Control de Caja */}
                                    <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                            <div className="space-y-2">
                                                <h3 className="text-2xl font-black text-slate-800">Control de Caja</h3>
                                                <p className="text-slate-500 font-medium">Gestione la apertura y cierre del flujo financiero</p>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-4">
                                                {!data?.store?.cashierStatus?.isOpen ? (
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="number"
                                                            placeholder="Saldo Inicial"
                                                            className="bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-700 w-40 focus:ring-2 focus:ring-primary/20"
                                                            onChange={(e) => setCashierModal({ ...cashierModal, initialValue: parseFloat(e.target.value) || 0 })}
                                                        />
                                                        <button
                                                            onClick={() => handleOpenCashier(cashierModal.initialValue)}
                                                            className="bg-green-500 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-green-600 transition-all shadow-lg shadow-green-500/20"
                                                        >
                                                            Abrir Caja
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-6">
                                                        <div className="text-right">
                                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Saldo Actual</p>
                                                            <p className="text-2xl font-black text-green-600">Gs. {data?.store?.cashierStatus?.currentBalance?.toLocaleString('es-ES')}</p>
                                                        </div>
                                                        <button
                                                            onClick={handleCloseCashier}
                                                            className="bg-red-500 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                                                        >
                                                            Cerrar Caja
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {
                            activeTab === 'orders' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                                <ShoppingCart className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Gestión de Pedidos</h3>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setSoundEnabled(!soundEnabled)}
                                                className={cn(
                                                    "p-3 rounded-xl transition-all",
                                                    soundEnabled ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-400"
                                                )}
                                            >
                                                {soundEnabled ? "🔔 Notificaciones ON" : "🔕 Silenciado"}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {data.orders.length === 0 ? (
                                            <div className="bg-white p-20 rounded-[3rem] text-center space-y-4 border border-slate-100">
                                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto opacity-40">
                                                    <ShoppingCart className="w-10 h-10 text-slate-300" />
                                                </div>
                                                <h3 className="font-black text-slate-400 uppercase tracking-widest">No hay pedidos registrados</h3>
                                            </div>
                                        ) : (
                                            data.orders.map((order: any) => (
                                                <div
                                                    key={order.id}
                                                    className={cn(
                                                        "bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border transition-all flex flex-col md:flex-row md:items-center gap-6 group hover:shadow-xl",
                                                        order.status === 'Pendiente' ? "border-primary/20 bg-primary/[0.02]" : "border-slate-100"
                                                    )}
                                                >

                                                    <div className="flex-1 space-y-4">
                                                        <div className="flex items-start justify-between">
                                                            <div>
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className="text-xs font-black text-primary bg-primary/5 px-2 py-0.5 rounded-md">#{order.id}</span>
                                                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{order.date}</span>
                                                                </div>
                                                                <h4 className="text-xl font-black text-slate-800">{order.customer?.name || "Cliente"}</h4>
                                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                                                                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                                                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                                        {order.customer?.address || order.address || "Retiro en Local"}
                                                                    </span>
                                                                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                                                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                                                                        {order.customer?.phone}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className={cn(
                                                                "px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm",
                                                                order.status === 'Pendiente' ? "bg-amber-500 text-white shadow-amber-500/20" :
                                                                    order.status === 'Preparando' ? "bg-blue-500 text-white shadow-blue-500/20" :
                                                                        order.status === 'En Camino' ? "bg-purple-500 text-white shadow-purple-500/20" :
                                                                            "bg-green-500 text-white shadow-green-500/20"
                                                            )}>
                                                                {order.status}
                                                            </div>
                                                        </div>

                                                        <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
                                                            {order.items.map((item: any, idx: number) => (
                                                                <div key={idx} className="flex justify-between text-sm">
                                                                    <span className="font-bold text-slate-600">
                                                                        <span className="text-primary mr-2">{item.quantity}x</span>
                                                                        {item.name}
                                                                    </span>
                                                                    <span className="font-black text-slate-400 text-xs">Gs. {(item.price * item.quantity).toLocaleString('es-ES')}</span>
                                                                </div>
                                                            ))}
                                                            <div className="border-t border-slate-200 pt-2 mt-2 flex justify-between items-center">
                                                                <span className="text-[10px] font-black uppercase text-slate-400">Total del Pedido</span>
                                                                <span className="text-lg font-black text-slate-800">Gs. {order.total.toLocaleString('es-ES')}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-row md:flex-col gap-2 md:w-48">
                                                        {order.status === 'Pendiente' && (
                                                            <button
                                                                onClick={() => {
                                                                    const newOrders = data.orders.map((o: any) => o.id === order.id ? { ...o, status: 'Preparando' } : o);
                                                                    setData({ ...data, orders: newOrders });
                                                                    handleSave({ ...data, orders: newOrders });
                                                                }}
                                                                className="flex-1 bg-primary text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                                                            >
                                                                Aceptar
                                                            </button>
                                                        )}
                                                        {order.status === 'Preparando' && (
                                                            <button
                                                                onClick={() => {
                                                                    const newOrders = data.orders.map((o: any) => o.id === order.id ? { ...o, status: 'En Camino' } : o);
                                                                    setData({ ...data, orders: newOrders });
                                                                    handleSave({ ...data, orders: newOrders });
                                                                }}
                                                                className="flex-1 bg-blue-500 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"
                                                            >
                                                                Despachar
                                                            </button>
                                                        )}
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => { setPrintableOrder(order); setPrintType('kitchen'); }}
                                                                className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-200 transition-all"
                                                            >
                                                                Cocina
                                                            </button>
                                                            <button
                                                                onClick={() => { setPrintableOrder(order); setPrintType('customer'); }}
                                                                className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                                                            >
                                                                Recibo
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={async () => {
                                                                if (confirm("¿Marcar este pedido como entregado?")) {
                                                                    const newOrders = data.orders.map((o: any) => o.id === order.id ? { ...o, status: 'Entregado' } : o);
                                                                    const newData = { ...data, orders: newOrders };
                                                                    setData(newData);
                                                                    handleSave(newData);
                                                                }
                                                            }}
                                                            className="flex-1 bg-green-500 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-green-600 transition-all shadow-lg shadow-green-500/20"
                                                        >
                                                            Entregado
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )
                        }

                        {
                            activeTab === 'pdv' && (
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-right-4 duration-500 max-w-[1600px] mx-auto">
                                    {/* Selección de Productos */}
                                    <div className="lg:col-span-2 space-y-8">
                                        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
                                            <div className="flex items-center gap-6 mb-8 overflow-x-auto pb-4 no-scrollbar">
                                                <button
                                                    onClick={() => setPdvCategory(null)}
                                                    className={cn(
                                                        "px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all",
                                                        !pdvCategory ? "bg-primary text-white shadow-xl shadow-primary/20" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                                                    )}
                                                >
                                                    Todos
                                                </button>
                                                {data.categories.map((cat: any) => (
                                                    <button
                                                        key={cat.id}
                                                        onClick={() => setPdvCategory(cat.id)}
                                                        className={cn(
                                                            "px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all",
                                                            pdvCategory === cat.id ? "bg-primary text-white shadow-xl shadow-primary/20" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                                                        )}
                                                    >
                                                        {cat.name}
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {data.products
                                                    .filter((p: any) => !pdvCategory || p.category === pdvCategory)
                                                    .map((product: any) => (
                                                        <button
                                                            key={product.id}
                                                            onClick={() => {
                                                                const exists = pdvCart.find(item => item.id === product.id);
                                                                if (exists) {
                                                                    updatePdvQuantity(product.id, 1);
                                                                } else {
                                                                    setPdvCart([...pdvCart, { ...product, quantity: 1 }]);
                                                                }
                                                            }}
                                                            className="bg-slate-50 p-4 rounded-[2rem] hover:bg-primary/5 hover:ring-2 hover:ring-primary/20 transition-all text-left flex flex-col gap-3 group relative overflow-hidden"
                                                        >
                                                            <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-black text-primary border border-primary/10">
                                                                Gs. {product.price.toLocaleString('es-ES')}
                                                            </div>
                                                            {product.image && (
                                                                <img src={product.image} className="w-full h-24 object-cover rounded-2xl shadow-sm group-hover:scale-105 transition-transform" />
                                                            )}
                                                            <span className="font-black text-slate-700 text-sm leading-tight flex-1">{product.name}</span>
                                                        </button>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Carrito PDV */}
                                    <div className="lg:col-span-1">
                                        <div className="bg-white p-8 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 sticky top-8 flex flex-col h-[calc(100vh-140px)]">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                                    <ShoppingCart className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Carrito Directo</h3>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Punto de Venta</p>
                                                </div>
                                            </div>

                                            <div className="flex-1 overflow-y-auto pr-2 no-scrollbar space-y-4">
                                                {pdvCart.length === 0 ? (
                                                    <div className="h-full flex flex-col items-center justify-center opacity-30 text-center space-y-4 grayscale">
                                                        <ShoppingCart className="w-16 h-16 text-slate-300" />
                                                        <p className="font-black text-xs uppercase tracking-widest text-slate-400">Carrito Vacío</p>
                                                    </div>
                                                ) : (
                                                    pdvCart.map((item: any) => (
                                                        <div key={item.id} className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between group">
                                                            <div className="flex-1 min-w-0 mr-4">
                                                                <h4 className="font-black text-slate-700 text-sm truncate">{item.name}</h4>
                                                                <p className="text-[10px] font-bold text-slate-400">Gs. {item.price.toLocaleString('es-ES')}</p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    onClick={() => updatePdvQuantity(item.id, -1)}
                                                                    className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:shadow-md transition-all shadow-sm"
                                                                >
                                                                    <Minus className="w-4 h-4" />
                                                                </button>
                                                                <span className="w-6 text-center font-black text-slate-700 text-sm">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => updatePdvQuantity(item.id, 1)}
                                                                    className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-primary hover:shadow-md transition-all shadow-sm"
                                                                >
                                                                    <Plus className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>

                                            <div className="pt-8 mt-8 border-t-2 border-slate-50 space-y-6">
                                                <div className="space-y-3">
                                                    <input
                                                        type="text"
                                                        placeholder="Nombre del Cliente"
                                                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 placeholder:text-slate-300 text-sm"
                                                        value={pdvCustomer.name}
                                                        onChange={(e) => setPdvCustomer({ ...pdvCustomer, name: e.target.value })}
                                                    />
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {['Efectivo', 'Tarjeta', 'Transferencia'].map((method) => (
                                                            <button
                                                                key={method}
                                                                onClick={() => setPdvCustomer({ ...pdvCustomer, payment: method })}
                                                                className={cn(
                                                                    "py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all border-2",
                                                                    pdvCustomer.payment === method ? "bg-slate-900 border-slate-900 text-white shadow-lg" : "border-slate-100 text-slate-400 hover:border-slate-200"
                                                                )}
                                                            >
                                                                {method}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between bg-primary/5 p-6 rounded-[2rem] border border-primary/10">
                                                    <span className="text-[10px] font-black uppercase text-primary/60 tracking-widest">Total</span>
                                                    <span className="text-2xl font-black text-primary">Gs. {pdvCart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toLocaleString('es-ES')}</span>
                                                </div>

                                                <button
                                                    onClick={finishPdvSale}
                                                    disabled={pdvCart.length === 0}
                                                    className="w-full bg-primary text-white py-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
                                                >
                                                    Finalizar Venta
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {
                            activeTab === 'products' && (
                                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                                <Utensils className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Gestión de Menú</h3>
                                                <p className="text-slate-500 font-medium">Administre sus productos, precios y adicionales</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                const newProduct = {
                                                    id: Math.random().toString(36).substr(2, 9),
                                                    name: "Nuevo Producto",
                                                    price: 0,
                                                    image: "",
                                                    description: "",
                                                    category: data.categories[0]?.id || "",
                                                    extras: [],
                                                    stock: 0,
                                                    trackStock: false
                                                };
                                                setData({ ...data, products: [...data.products, newProduct] });
                                            }}
                                            className="bg-primary text-white px-8 py-4 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center gap-2 active:scale-95"
                                        >
                                            <Plus className="w-4 h-4" /> Nuevo Producto
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        {data.products.map((product: any) => (
                                            <div key={product.id} className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 group hover:shadow-xl transition-all">
                                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                                                    {/* Imagen y Básico */}
                                                    <div className="space-y-4">
                                                        <div className="relative aspect-square bg-slate-50 rounded-[2.5rem] overflow-hidden group/img border-2 border-dashed border-slate-200 hover:border-primary/50 transition-colors">
                                                            {product.image ? (
                                                                <>
                                                                    <img src={product.image} className="w-full h-full object-cover" />
                                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                                                        <label className="cursor-pointer bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform">
                                                                            Cambiar
                                                                            <input
                                                                                type="file"
                                                                                className="hidden"
                                                                                accept="image/*"
                                                                                onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], `products/${product.id}`, (url) => updateProduct(product.id, 'image', url))}
                                                                            />
                                                                        </label>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors">
                                                                    <ImagePlus className="w-10 h-10 text-slate-300 mb-2" />
                                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subir Imagen</span>
                                                                    <input
                                                                        type="file"
                                                                        className="hidden"
                                                                        accept="image/*"
                                                                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], `products/${product.id}`, (url) => updateProduct(product.id, 'image', url))}
                                                                    />
                                                                </label>
                                                            )}
                                                            {uploading === `products/${product.id}` && (
                                                                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                                                                    <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Detalles */}
                                                    <div className="lg:col-span-2 space-y-6">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Nombre del Producto</label>
                                                                <input
                                                                    type="text"
                                                                    value={product.name}
                                                                    onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                                                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-700 focus:ring-2 focus:ring-primary/20"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Categoría</label>
                                                                <select
                                                                    value={product.category}
                                                                    onChange={(e) => updateProduct(product.id, 'category', e.target.value)}
                                                                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-700 focus:ring-2 focus:ring-primary/20"
                                                                >
                                                                    {data.categories.map((cat: any) => (
                                                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Descripción (Opcional)</label>
                                                            <textarea
                                                                value={product.description}
                                                                onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                                                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 h-24 resize-none"
                                                                placeholder="Describa el producto..."
                                                            />
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-slate-50 rounded-3xl">
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Precio de Venta</label>
                                                                <div className="relative">
                                                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-400">Gs.</span>
                                                                    <input
                                                                        type="number"
                                                                        value={product.price}
                                                                        onChange={(e) => updateProduct(product.id, 'price', parseFloat(e.target.value) || 0)}
                                                                        className="w-full bg-white border-none rounded-2xl pl-14 pr-6 py-4 font-black text-slate-700 shadow-sm"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-4">
                                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Control de Stock</label>
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center gap-3">
                                                                        <button
                                                                            onClick={() => updateProduct(product.id, 'trackStock', !product.trackStock)}
                                                                            className={cn(
                                                                                "w-12 h-6 rounded-full transition-all relative",
                                                                                product.trackStock ? "bg-primary" : "bg-slate-300"
                                                                            )}
                                                                        >
                                                                            <div className={cn(
                                                                                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                                                                                product.trackStock ? "left-7" : "left-1"
                                                                            )} />
                                                                        </button>
                                                                        <span className="text-xs font-bold text-slate-500">{product.trackStock ? 'Activo' : 'Inactivo'}</span>
                                                                    </div>
                                                                    {product.trackStock && (
                                                                        <input
                                                                            type="number"
                                                                            value={product.stock}
                                                                            onChange={(e) => updateProduct(product.id, 'stock', parseInt(e.target.value) || 0)}
                                                                            className="w-20 bg-white border-none rounded-xl px-4 py-2 font-black text-slate-700 shadow-sm text-center"
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Adicionales */}
                                                    <div className="space-y-4 border-l border-slate-100 pl-8">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Adicionales</h5>
                                                            <button
                                                                onClick={() => addProductExtra(product.id)}
                                                                className="p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                                                            {product.extras?.map((extra: any) => (
                                                                <div key={extra.id} className="flex gap-2 items-center group/extra">
                                                                    <input
                                                                        type="text"
                                                                        value={extra.name}
                                                                        onChange={(e) => {
                                                                            const newExtras = product.extras.map((ex: any) => ex.id === extra.id ? { ...ex, name: e.target.value } : ex);
                                                                            updateProduct(product.id, 'extras', newExtras);
                                                                        }}
                                                                        className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-slate-700"
                                                                    />
                                                                    <input
                                                                        type="number"
                                                                        value={extra.price}
                                                                        onChange={(e) => {
                                                                            const newExtras = product.extras.map((ex: any) => ex.id === extra.id ? { ...ex, price: parseFloat(e.target.value) || 0 } : ex);
                                                                            updateProduct(product.id, 'extras', newExtras);
                                                                        }}
                                                                        className="w-16 bg-slate-50 border-none rounded-xl px-2 py-2 text-xs font-black text-slate-700 text-center"
                                                                    />
                                                                    <button
                                                                        onClick={() => deleteProductExtra(product.id, extra.id)}
                                                                        className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors opacity-0 group-hover/extra:opacity-100"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <button
                                                            onClick={() => {
                                                                if (confirm("¿Eliminar este producto permanentemente?")) {
                                                                    setData({ ...data, products: data.products.filter((p: any) => p.id !== product.id) });
                                                                }
                                                            }}
                                                            className="w-full mt-auto bg-red-50 text-red-500 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-500 hover:text-white transition-all border border-red-100"
                                                        >
                                                            Eliminar Producto
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {
                            activeTab === 'categories' && (
                                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 max-w-4xl">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                                <LayoutDashboard className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Categorías</h3>
                                                <p className="text-slate-500 font-medium">Organice sus productos en grupos</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                const newCategory = {
                                                    id: Math.random().toString(36).substr(2, 9),
                                                    name: "Nueva Categoría",
                                                    image: ""
                                                };
                                                setData({ ...data, categories: [...data.categories, newCategory] });
                                            }}
                                            className="bg-primary text-white px-8 py-4 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center gap-2"
                                        >
                                            <Plus className="w-4 h-4" /> Nueva Categoría
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {data.categories.map((cat: any) => (
                                            <CategoryCard
                                                key={cat.id}
                                                cat={cat}
                                                setData={setData}
                                                data={data}
                                                handleImageUpload={handleImageUpload}
                                                uploading={uploading}
                                                updateCategory={updateCategory}
                                                deleteCategory={deleteCategory}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {
                            activeTab === 'coupons' && (
                                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 max-w-4xl">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                                <Ticket className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Cupones de Descuento</h3>
                                                <p className="text-slate-500 font-medium">Cree promociones para sus clientes</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                const newCoupon = {
                                                    id: Math.random().toString(36).substr(2, 9),
                                                    code: "NUEVO20",
                                                    discount: 20,
                                                    type: 'percentage'
                                                };
                                                setData({ ...data, coupons: [...(data.coupons || []), newCoupon] });
                                            }}
                                            className="bg-primary text-white px-8 py-4 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center gap-2"
                                        >
                                            <Plus className="w-4 h-4" /> Nuevo Cupón
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {data.coupons?.map((coupon: any) => (
                                            <CouponCard
                                                key={coupon.id}
                                                coupon={coupon}
                                                setData={setData}
                                                data={data}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        {
                            activeTab === 'cash' && (
                                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 max-w-4xl">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                            <Calculator className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Control de Caja</h3>
                                            <p className="text-slate-500 font-medium">Gestione la apertura y cierre del turno</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Estado Actual */}
                                        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-6">
                                            <div className={cn(
                                                "w-20 h-20 rounded-3xl flex items-center justify-center transition-all",
                                                data?.store?.cashierStatus?.isOpen ? "bg-green-500 text-white shadow-xl shadow-green-500/20" : "bg-red-500 text-white shadow-xl shadow-red-500/20"
                                            )}>
                                                {data?.store?.cashierStatus?.isOpen ? <Unlock className="w-10 h-10" /> : <Lock className="w-10 h-10" />}
                                            </div>
                                            <div>
                                                <h4 className="text-2xl font-black text-slate-800">
                                                    Caja {data?.store?.cashierStatus?.isOpen ? 'Abierta' : 'Cerrada'}
                                                </h4>
                                                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">
                                                    Estado Actual del Sistema
                                                </p>
                                            </div>

                                            {data?.store?.cashierStatus?.isOpen ? (
                                                <div className="w-full space-y-4">
                                                    <div className="bg-slate-50 p-6 rounded-3xl space-y-2 text-left">
                                                        <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                                                            <span>Apertura:</span>
                                                            <span className="text-slate-700">{data?.store?.cashierStatus?.openingTime}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                                                            <span>Saldo Inicial:</span>
                                                            <span className="text-slate-700 font-black">Gs. {data?.store?.cashierStatus?.initialBalance?.toLocaleString('es-ES')}</span>
                                                        </div>
                                                        <div className="border-t border-slate-200 pt-2 mt-2 flex justify-between items-center">
                                                            <span className="text-xs font-black text-primary uppercase">Saldo Actual:</span>
                                                            <span className="text-2xl font-black text-slate-800">Gs. {data?.store?.cashierStatus?.currentBalance?.toLocaleString('es-ES')}</span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={handleCloseCashier}
                                                        className="w-full bg-red-500 text-white py-6 rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-xl shadow-red-500/20 hover:bg-red-600 transition-all active:scale-95 flex items-center justify-center gap-3"
                                                    >
                                                        <Power className="w-5 h-5" /> Cerrar Caja
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="w-full space-y-4">
                                                    <div className="space-y-2 text-left">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Saldo Inicial para Apertura</label>
                                                        <div className="relative">
                                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-400">Gs.</span>
                                                            <input
                                                                type="number"
                                                                id="initial-balance"
                                                                className="w-full bg-slate-50 border-none rounded-[2rem] pl-14 pr-6 py-6 font-black text-slate-700 text-xl focus:ring-2 focus:ring-primary/20 shadow-inner"
                                                                placeholder="0.00"
                                                            />
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            const val = parseFloat((document.getElementById('initial-balance') as HTMLInputElement)?.value || "0");
                                                            handleOpenCashier(val);
                                                        }}
                                                        className="w-full bg-green-500 text-white py-6 rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-xl shadow-green-500/20 hover:bg-green-600 transition-all active:scale-95 flex items-center justify-center gap-3"
                                                    >
                                                        <Play className="w-5 h-5" /> Abrir Turno de Caja
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Historial de Ventas Rápidas */}
                                        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 space-y-6">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-1.5 h-6 bg-primary rounded-full" />
                                                <h4 className="text-xl font-black text-slate-800 uppercase tracking-tight">Última Actividad</h4>
                                            </div>
                                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                                                {data.orders.filter((o: any) => o.status === 'Entregado').slice(-5).map((order: any) => (
                                                    <div key={order.id} className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between">
                                                        <div>
                                                            <p className="text-xs font-black text-slate-700">{order.customer?.name || "Venta Rápida"}</p>
                                                            <p className="text-[10px] text-slate-400 font-bold">{order.date}</p>
                                                        </div>
                                                        <span className="text-sm font-black text-green-500">
                                                            + Gs. {order.total.toLocaleString('es-ES')}
                                                        </span>
                                                    </div>
                                                ))}
                                                {data.orders.filter((o: any) => o.status === 'Entregado').length === 0 && (
                                                    <div className="h-40 flex flex-col items-center justify-center opacity-20 italic">
                                                        <p className="text-xs font-bold text-slate-400">Sin movimientos registrados</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {
                            activeTab === 'config' && (
                                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 max-w-4xl pb-20">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                                <Settings className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Configuración de la Tienda</h3>
                                                <p className="text-slate-500 font-medium">Personalice su establecimiento</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleSave()}
                                            disabled={saving}
                                            className="bg-primary text-white px-8 py-4 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center gap-2"
                                        >
                                            <Save className="w-4 h-4" /> {saving ? "Guardando..." : "Guardar Cambios"}
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Información General */}
                                        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 space-y-6">
                                            <h4 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                                <Monitor className="w-5 h-5 text-primary" /> General
                                            </h4>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 ml-2">Nombre de la Tienda</label>
                                                    <input
                                                        type="text"
                                                        value={data.store.name}
                                                        onChange={(e) => setData({ ...data, store: { ...data.store, name: e.target.value } })}
                                                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-black text-slate-700 text-sm focus:ring-2 focus:ring-primary/20"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 ml-2">WhatsApp (con código de país)</label>
                                                    <input
                                                        type="text"
                                                        value={data.store.whatsapp}
                                                        onChange={(e) => setData({ ...data, store: { ...data.store, whatsapp: e.target.value } })}
                                                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-black text-slate-700 text-sm focus:ring-2 focus:ring-primary/20"
                                                        placeholder="595981234567"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                                                    <input
                                                        type="checkbox"
                                                        id="trackStock"
                                                        checked={data.store.trackStock}
                                                        onChange={(e) => setData({ ...data, store: { ...data.store, trackStock: e.target.checked } })}
                                                        className="w-5 h-5 rounded text-primary focus:ring-primary/20"
                                                    />
                                                    <label htmlFor="trackStock" className="text-xs font-black text-slate-700 cursor-pointer">Controlar Stock de Productos</label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Ubicación y Pedido Mínimo */}
                                        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 space-y-6">
                                            <h4 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                                <MapPin className="w-5 h-5 text-primary" /> Delivery y Ubicación
                                            </h4>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 ml-2">Dirección Completa</label>
                                                    <input
                                                        type="text"
                                                        value={data.store.address}
                                                        onChange={(e) => setData({ ...data, store: { ...data.store, address: e.target.value } })}
                                                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-black text-slate-700 text-sm focus:ring-2 focus:ring-primary/20"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 ml-2">Ciudad</label>
                                                    <input
                                                        type="text"
                                                        value={data.store.city}
                                                        onChange={(e) => setData({ ...data, store: { ...data.store, city: e.target.value } })}
                                                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-black text-slate-700 text-sm focus:ring-2 focus:ring-primary/20"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 ml-2">Pedido Mínimo (Gs.)</label>
                                                        <input
                                                            type="number"
                                                            value={data.store.minOrder}
                                                            onChange={(e) => setData({ ...data, store: { ...data.store, minOrder: parseFloat(e.target.value) || 0 } })}
                                                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-black text-slate-700 text-sm focus:ring-2 focus:ring-primary/20"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 ml-2">Costo Delivery (Gs.)</label>
                                                        <input
                                                            type="number"
                                                            value={data.store.deliveryFee}
                                                            onChange={(e) => setData({ ...data, store: { ...data.store, deliveryFee: parseFloat(e.target.value) || 0 } })}
                                                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-black text-slate-700 text-sm focus:ring-2 focus:ring-primary/20"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Horarios */}
                                        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 col-span-1 md:col-span-2 space-y-6">
                                            <h4 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                                <Clock className="w-5 h-5 text-primary" /> Horarios de Atención
                                            </h4>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                                {['isOpen', 'openTime', 'closeTime'].map((field) => (
                                                    <div key={field} className="space-y-4">
                                                        {field === 'isOpen' ? (
                                                            <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-[2rem] h-full">
                                                                <input
                                                                    type="checkbox"
                                                                    id="isOpen"
                                                                    checked={data.store.isOpen}
                                                                    onChange={(e) => setData({ ...data, store: { ...data.store, isOpen: e.target.checked } })}
                                                                    className="w-6 h-6 rounded text-primary focus:ring-primary/20"
                                                                />
                                                                <label htmlFor="isOpen" className="text-sm font-black text-slate-700 uppercase tracking-tight">Tienda Abierta</label>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-4">
                                                                    {field === 'openTime' ? 'Apertura' : 'Cierre'}
                                                                </label>
                                                                <input
                                                                    type="time"
                                                                    value={data.store[field]}
                                                                    onChange={(e) => setData({ ...data, store: { ...data.store, [field]: e.target.value } })}
                                                                    className="w-full bg-slate-50 border-none rounded-[2rem] px-8 py-5 font-black text-slate-700 text-lg focus:ring-2 focus:ring-primary/20 shadow-inner"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                                <div className="flex flex-col justify-end">
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase px-4 leading-tight italic">
                                                        * Los cambios se reflejan instantáneamente en el menú digital.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Métodos de Pago */}
                                        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 col-span-1 md:col-span-2 space-y-6">
                                            <h4 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                                <CreditCard className="w-5 h-5 text-primary" /> Métodos de Pago
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                                {['Efectivo', 'Tarjeta (POS)', 'Transferencia', 'Pix / QR'].map((method) => (
                                                    <div key={method} className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            id={method}
                                                            checked={data.store.paymentMethods?.includes(method)}
                                                            onChange={(e) => {
                                                                const methods = data.store.paymentMethods || [];
                                                                if (e.target.checked) {
                                                                    setData({ ...data, store: { ...data.store, paymentMethods: [...methods, method] } });
                                                                } else {
                                                                    setData({ ...data, store: { ...data.store, paymentMethods: methods.filter((m: any) => m !== method) } });
                                                                }
                                                            }}
                                                            className="w-5 h-5 rounded text-primary focus:ring-primary/20"
                                                        />
                                                        <label htmlFor={method} className="text-xs font-black text-slate-700 uppercase tracking-tight cursor-pointer">{method}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {
                            activeTab === 'analytics' && (
                                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 max-w-6xl pb-20">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                            <BarChart3 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Reportes y Estadísticas</h3>
                                            <p className="text-slate-500 font-medium">Análisis de rendimiento de su negocio</p>
                                        </div>
                                    </div>

                                    {/* Resumen de Tarjetas */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
                                            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-500">
                                                <DollarSign className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ventas Totales</p>
                                                <h4 className="text-2xl font-black text-slate-800 mt-1">
                                                    Gs. {data.orders?.reduce((acc: any, o: any) => acc + (o.status === 'Entregado' ? o.total : 0), 0).toLocaleString('es-ES')}
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
                                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                                                <ShoppingCart className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pedidos Entregados</p>
                                                <h4 className="text-2xl font-black text-slate-800 mt-1">
                                                    {data.orders?.filter((o: any) => o.status === 'Entregado').length}
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
                                            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500">
                                                <TrendingUp className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ticket Promedio</p>
                                                <h4 className="text-2xl font-black text-slate-800 mt-1">
                                                    Gs. {((data.orders?.reduce((acc: any, o: any) => acc + (o.status === 'Entregado' ? o.total : 0), 0) || 0) / (data.orders?.filter((o: any) => o.status === 'Entregado').length || 1)).toLocaleString('es-ES', { maximumFractionDigits: 0 })}
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
                                            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
                                                <User className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nuevos Clientes</p>
                                                <h4 className="text-2xl font-black text-slate-800 mt-1">
                                                    {new Set(data.orders?.map((o: any) => o.customer?.phone)).size}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Gráficos y Listas */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Productos más vendidos */}
                                        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
                                            <h4 className="text-xl font-black text-slate-800 flex items-center gap-3 mb-8">
                                                <Utensils className="w-6 h-6 text-primary" /> Productos Estrella
                                            </h4>
                                            <div className="space-y-6">
                                                {Object.entries(
                                                    data.orders?.filter((o: any) => o.status === 'Entregado')
                                                        .reduce((acc: any, order: any) => {
                                                            order.items.forEach((item: any) => {
                                                                acc[item.name] = (acc[item.name] || 0) + item.quantity;
                                                            });
                                                            return acc;
                                                        }, {})
                                                ).sort((a: any, b: any) => b[1] - a[1]).slice(0, 5).map(([name, qty]: any, idx) => (
                                                    <div key={name} className="flex items-center justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-xs font-black text-slate-400">
                                                                #{idx + 1}
                                                            </div>
                                                            <span className="font-black text-slate-700">{name}</span>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                                                                <div
                                                                    className="h-full bg-primary"
                                                                    style={{ width: `${(qty / 100) * 100}%` }}
                                                                />
                                                            </div>
                                                            <span className="text-sm font-black text-slate-800">{qty} uds.</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Métodos de Pago más usados */}
                                        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
                                            <h4 className="text-xl font-black text-slate-800 flex items-center gap-3 mb-8">
                                                <PieChart className="w-6 h-6 text-primary" /> Distribución de Pagos
                                            </h4>
                                            <div className="space-y-6">
                                                {Object.entries(
                                                    data.orders?.filter((o: any) => o.status === 'Entregado')
                                                        .reduce((acc: any, order: any) => {
                                                            acc[order.paymentMethod] = (acc[order.paymentMethod] || 0) + 1;
                                                            return acc;
                                                        }, {})
                                                ).map(([method, count]: any) => (
                                                    <div key={method} className="flex items-center justify-between">
                                                        <span className="font-black text-slate-700">{method}</span>
                                                        <div className="flex items-center gap-4 w-2/3">
                                                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-primary"
                                                                    style={{ width: `${(count / data.orders.filter((o: any) => o.status === 'Entregado').length) * 100}%` }}
                                                                />
                                                            </div>
                                                            <span className="text-sm font-black text-slate-800 w-12 text-right">{count}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {
                            activeTab === 'banners' && (
                                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 max-w-4xl pb-20">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                                <Images className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Banners Promocionales</h3>
                                                <p className="text-slate-500 font-medium">Anuncios en el carrusel principal</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                const newBanner = {
                                                    id: Math.random().toString(36).substr(2, 9),
                                                    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
                                                    title: "Nueva Promo"
                                                };
                                                setData({ ...data, banners: [...(data.banners || []), newBanner] });
                                            }}
                                            className="bg-primary text-white px-8 py-4 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center gap-2"
                                        >
                                            <Plus className="w-4 h-4" /> Nuevo Banner
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {data.banners?.map((banner: any) => (
                                            <div key={banner.id} className="bg-white p-6 rounded-[3rem] shadow-sm border border-slate-100 group hover:shadow-xl transition-all space-y-4">
                                                <div className="h-48 rounded-[2rem] bg-slate-100 overflow-hidden relative">
                                                    <img src={banner.image} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                        <label className="p-4 bg-white text-slate-800 rounded-2xl cursor-pointer hover:scale-110 transition-transform">
                                                            <Upload className="w-6 h-6" />
                                                            <input
                                                                type="file"
                                                                className="hidden"
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) handleImageUpload(file, `banner-${banner.id}`, (url) => {
                                                                        const newBanners = data.banners.map((b: any) => b.id === banner.id ? { ...b, image: url } : b);
                                                                        setData({ ...data, banners: newBanners });
                                                                    });
                                                                }}
                                                            />
                                                        </label>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm("¿Eliminar este banner?")) {
                                                                    setData({ ...data, banners: data.banners.filter((b: any) => b.id !== banner.id) });
                                                                }
                                                            }}
                                                            className="p-4 bg-red-500 text-white rounded-2xl hover:scale-110 transition-transform"
                                                        >
                                                            <Trash2 className="w-6 h-6" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="px-4">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Título del Banner (Opcional)</label>
                                                    <input
                                                        type="text"
                                                        value={banner.title}
                                                        onChange={(e) => {
                                                            const newBanners = data.banners.map((b: any) => b.id === banner.id ? { ...b, title: e.target.value } : b);
                                                            setData({ ...data, banners: newBanners });
                                                        }}
                                                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 font-black text-slate-700 text-sm focus:ring-2 focus:ring-primary/20"
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                        {(!data.banners || data.banners.length === 0) && (
                                            <div className="col-span-full h-64 border-4 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center text-slate-300 gap-4">
                                                <Images className="w-16 h-16" />
                                                <p className="font-black uppercase text-xs tracking-widest">No hay banners configurados</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        }
                    </main>
                </div>

                {/* MODAL DETALHES DO PEDIDO */}
                {selectedOrder && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                        <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white rounded-2xl shadow-sm">
                                        <ShoppingCart className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-800">Pedido #{selectedOrder.id}</h3>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selectedOrder.date}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedOrder(null)} className="p-4 bg-white text-slate-400 hover:text-red-500 rounded-2xl shadow-sm transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                                {/* Status Atual */}
                                <div className="flex items-center gap-3">
                                    <span className={cn(
                                        "px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest",
                                        selectedOrder.status === 'Pendiente' ? "bg-amber-100 text-amber-600" :
                                            selectedOrder.status === 'Preparando' ? "bg-blue-100 text-blue-600" :
                                                selectedOrder.status === 'En Camino' ? "bg-purple-100 text-purple-600" :
                                                    selectedOrder.status === 'Entregado' ? "bg-green-100 text-green-600" :
                                                        "bg-red-100 text-red-600"
                                    )}>
                                        {selectedOrder.status}
                                    </span>
                                    <div className="h-px flex-1 bg-slate-100" />
                                </div>

                                {/* Cliente */}
                                <div className="grid grid-cols-2 gap-8 bg-slate-50 rounded-[2.5rem] p-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-slate-400">
                                            <User className="w-4 h-4" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Cliente</span>
                                        </div>
                                        <p className="text-lg font-black text-slate-800">{selectedOrder.customer.name}</p>
                                        <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
                                            <Phone className="w-4 h-4" /> {selectedOrder.customer.phone}
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-slate-400">
                                            <MapPin className="w-4 h-4" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Entrega</span>
                                        </div>
                                        <p className="text-sm text-slate-700 font-bold leading-relaxed">
                                            {selectedOrder.customer.address}<br />
                                            <span className="text-slate-400">{selectedOrder.customer.neighborhood}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Itens */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-slate-400 mb-6">
                                        <Utensils className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Productos del Pedido</span>
                                    </div>
                                    {selectedOrder.items.map((item: any, idx: number) => (
                                        <div key={idx} className="flex gap-4 p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
                                            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400">
                                                {item.quantity}x
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-black text-slate-800">{item.name}</h4>
                                                {item.selectedExtras?.length > 0 && (
                                                    <p className="text-[10px] font-bold text-primary mt-1">
                                                        + {item.selectedExtras.map((e: any) => e.name).join(', ')}
                                                    </p>
                                                )}
                                                {item.observation && (
                                                    <p className="text-[10px] italic text-slate-400 mt-1 flex items-center gap-1">
                                                        <MessageCircle className="w-3 h-3" /> "{item.observation}"
                                                    </p>
                                                )}
                                            </div>
                                            <div className="font-black text-slate-700">
                                                Gs. {(item.price * item.quantity).toLocaleString('es-ES')}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Totais */}
                                <div className="pt-8 border-t border-slate-100 space-y-3">
                                    <div className="flex justify-between items-center text-slate-500 font-bold">
                                        <span>Subtotal</span>
                                        <span>Gs. {(selectedOrder.total - (selectedOrder.deliveryFee || 0)).toLocaleString('es-ES')}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-slate-500 font-bold">
                                        <span>Delivery</span>
                                        <span>Gs. {(selectedOrder.deliveryFee || 0).toLocaleString('es-ES')}</span>
                                    </div>
                                    {selectedOrder.discount > 0 && (
                                        <div className="flex justify-between items-center text-green-500 font-black">
                                            <span>Descuento</span>
                                            <span>- Gs. {selectedOrder.discount.toLocaleString('es-ES')}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center pt-4">
                                        <span className="text-xl font-black text-slate-800">Total</span>
                                        <span className="text-2xl font-black text-primary">Gs. {selectedOrder.total.toLocaleString('es-ES')}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
                                        <span>Método de Pago:</span>
                                        <span>{selectedOrder.paymentMethod}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-4">
                                {selectedOrder.status === 'Pendiente' && (
                                    <>
                                        <button
                                            onClick={() => updateOrderStatus(selectedOrder.id, 'Cancelado')}
                                            className="py-4 rounded-2xl bg-white text-red-500 font-black uppercase text-xs tracking-widest border border-red-100 hover:bg-red-50 transition-all"
                                        >
                                            Rechazar
                                        </button>
                                        <button
                                            onClick={() => updateOrderStatus(selectedOrder.id, 'Preparando')}
                                            className="py-4 rounded-2xl bg-primary text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all"
                                        >
                                            Aceptar Pedido
                                        </button>
                                    </>
                                )}
                                {selectedOrder.status === 'Preparando' && (
                                    <button
                                        onClick={() => updateOrderStatus(selectedOrder.id, 'En Camino')}
                                        className="col-span-2 py-4 rounded-2xl bg-blue-500 text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-500/20 hover:scale-105 transition-all"
                                    >
                                        Enviar para Entrega
                                    </button>
                                )}
                                {selectedOrder.status === 'En Camino' && (
                                    <button
                                        onClick={() => updateOrderStatus(selectedOrder.id, 'Entregado')}
                                        className="col-span-2 py-4 rounded-2xl bg-green-500 text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-green-500/20 hover:scale-105 transition-all"
                                    >
                                        Marcar como Entregado
                                    </button>
                                )}
                                {selectedOrder.status === 'Entregado' && (
                                    <p className="col-span-2 text-center text-[10px] font-black text-green-500 uppercase tracking-widest py-4 bg-green-50 rounded-2xl">
                                        Pedido Finalizado con Éxito
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </>
        );
    } catch (e) {
        console.error("Critical Render Error:", e);
        return (
            <div className="min-h-screen flex items-center justify-center p-4 text-center bg-slate-50">
                <div className="bg-white p-8 rounded-[3rem] shadow-2xl max-w-sm">
                    <div className="bg-red-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-red-500">
                        <X className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 mb-2">Error Crítico</h2>
                    <p className="text-slate-500 text-sm mb-8 font-medium italic">Hubo un problema al renderizar el panel. Por favor, recargue la página.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
                    >
                        Recargar Ahora
                    </button>
                    <p className="mt-4 text-[10px] text-slate-300 font-bold uppercase tracking-tighter">Support ID: 0x8273-X</p>
                </div>
            </div>
        );
    }
}

const ProductCard = ({ product, updateProduct, deleteProduct, addProductExtra, deleteProductExtra, categories, handleImageUpload, uploading }: any) => {
    return (
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
            <div className="flex flex-col gap-6">
                <div className="relative h-56 rounded-[2.5rem] bg-slate-50 overflow-hidden group/img">
                    {product.image ? (
                        <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2">
                            <ImageIcon className="w-12 h-12" />
                            <span className="text-[10px] font-black uppercase">Sin Imagen</span>
                        </div>
                    )}
                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                        <div className="bg-white p-4 rounded-2xl transform translate-y-4 group-hover/img:translate-y-0 transition-transform">
                            {uploading === product.id ? <div className="w-6 h-6 border-4 border-primary border-t-transparent animate-spin rounded-full" /> : <Upload className="w-6 h-6 text-primary" />}
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(file, product.id, (url: string) => updateProduct(product.id, 'image', url));
                            }}
                        />
                    </label>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 ml-4">Nombre del Producto</label>
                            <input
                                type="text"
                                value={product.name}
                                onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-3 font-black text-slate-700 text-sm focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 ml-4">Categoría</label>
                            <select
                                value={product.category}
                                onChange={(e) => updateProduct(product.id, 'category', e.target.value)}
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-3 font-black text-slate-700 text-sm focus:ring-2 focus:ring-primary/20"
                            >
                                {categories.map((c: any) => <option key={c.id} value={c.name}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 ml-4">Precio (Gs.)</label>
                            <input
                                type="number"
                                value={product.price}
                                onChange={(e) => updateProduct(product.id, 'price', parseFloat(e.target.value))}
                                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-3 font-black text-slate-700 text-sm focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 ml-4">Descripción</label>
                        <textarea
                            value={product.description}
                            onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-3 font-bold text-slate-600 text-xs focus:ring-2 focus:ring-primary/20 min-h-[80px]"
                        />
                    </div>

                    <div className="space-y-4 pt-4">
                        <div className="flex items-center justify-between px-4">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Adicionales</h5>
                            <button
                                onClick={() => addProductExtra(product.id)}
                                className="text-primary hover:scale-110 transition-transform"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-2 max-h-40 overflow-y-auto pr-2 no-scrollbar">
                            {product.extras?.map((extra: any) => (
                                <div key={extra.id} className="flex items-center gap-2 group/extra">
                                    <input
                                        type="text"
                                        value={extra.name}
                                        onChange={(e) => {
                                            const newExtras = product.extras.map((ex: any) => ex.id === extra.id ? { ...ex, name: e.target.value } : ex);
                                            updateProduct(product.id, 'extras', newExtras);
                                        }}
                                        className="flex-1 bg-slate-100/50 border-none rounded-xl px-4 py-2 text-[10px] font-black text-slate-600 focus:ring-1 focus:ring-primary/20"
                                    />
                                    <input
                                        type="number"
                                        value={extra.price}
                                        onChange={(e) => {
                                            const newExtras = product.extras.map((ex: any) => ex.id === extra.id ? { ...ex, price: parseFloat(e.target.value) } : ex);
                                            updateProduct(product.id, 'extras', newExtras);
                                        }}
                                        className="w-20 bg-slate-100/50 border-none rounded-xl px-4 py-2 text-[10px] font-black text-slate-600 focus:ring-1 focus:ring-primary/20"
                                    />
                                    <button
                                        onClick={() => deleteProductExtra(product.id, extra.id)}
                                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Stock</label>
                                <input
                                    type="number"
                                    value={product.stock || 0}
                                    onChange={(e) => updateProduct(product.id, 'stock', parseInt(e.target.value))}
                                    className="w-16 bg-transparent border-none p-0 font-black text-slate-800 text-lg focus:ring-0"
                                />
                            </div>
                            <div className="h-8 w-px bg-slate-100" />
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id={`promo-${product.id}`}
                                    checked={product.promo}
                                    onChange={(e) => updateProduct(product.id, 'promo', e.target.checked)}
                                    className="w-4 h-4 rounded text-primary focus:ring-primary/20"
                                />
                                <label htmlFor={`promo-${product.id}`} className="text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer">Promo</label>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                if (confirm("¿Seguro que desea eliminar este producto?")) deleteProduct(product.id);
                            }}
                            className="p-4 bg-slate-50 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                        >
                            <Trash2 className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CategoryCard = ({ cat, setData, data, handleImageUpload, uploading, updateCategory, deleteCategory }: any) => {
    return (
        <div key={cat.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6 group hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl overflow-hidden relative shrink-0">
                {cat.image ? (
                    <img src={cat.image} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                        <ImageIcon className="w-6 h-6" />
                    </div>
                )}
                <label className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], `categories/${cat.id}`, (url: string) => {
                            const newCats = data.categories.map((c: any) => c.id === cat.id ? { ...c, image: url } : c);
                            setData({ ...data, categories: newCats });
                        })}
                    />
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin absolute" style={{ display: uploading === `categories/${cat.id}` ? 'block' : 'none' }} />
                    <Upload className="w-6 h-6 text-white" />
                </label>
            </div>
            <input
                type="text"
                value={cat.name}
                onChange={(e) => updateCategory(cat.id, e.target.value)}
                className="flex-1 bg-transparent border-none font-black text-slate-700 text-lg focus:ring-0"
            />
            <button
                onClick={() => deleteCategory(cat.id)}
                className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
            >
                <Trash2 className="w-6 h-6" />
            </button>
        </div>
    );
};

const CouponCard = ({ coupon, setData, data }: any) => {
    return (
        <div key={coupon.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6 group hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <Ticket className="w-8 h-8" />
            </div>
            <div className="flex-1 grid grid-cols-3 gap-4">
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 ml-2">Código</label>
                    <input
                        type="text"
                        value={coupon.code}
                        onChange={(e) => {
                            const newCoupons = data.coupons.map((c: any) => c.id === coupon.id ? { ...c, code: e.target.value.toUpperCase() } : c);
                            setData({ ...data, coupons: newCoupons });
                        }}
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 font-black text-slate-700 text-sm focus:ring-2 focus:ring-primary/20"
                    />
                </div>
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 ml-2">Descuento</label>
                    <input
                        type="number"
                        value={coupon.discount}
                        onChange={(e) => {
                            const newCoupons = data.coupons.map((c: any) => c.id === coupon.id ? { ...c, discount: parseFloat(e.target.value) || 0 } : c);
                            setData({ ...data, coupons: newCoupons });
                        }}
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 font-black text-slate-700 text-sm focus:ring-2 focus:ring-primary/20"
                    />
                </div>
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 ml-2">Tipo</label>
                    <select
                        value={coupon.type}
                        onChange={(e) => {
                            const newCoupons = data.coupons.map((c: any) => c.id === coupon.id ? { ...c, type: e.target.value } : c);
                            setData({ ...data, coupons: newCoupons });
                        }}
                        className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 font-black text-slate-700 text-sm focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="percentage">Porcentaje (%)</option>
                        <option value="fixed">Fijo (Gs.)</option>
                    </select>
                </div>
            </div>
            <button
                onClick={() => {
                    if (confirm("¿Eliminar este cupón?")) {
                        setData({ ...data, coupons: data.coupons.filter((c: any) => c.id !== coupon.id) });
                    }
                }}
                className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
            >
                <Trash2 className="w-6 h-6" />
            </button>
        </div>
    );
};


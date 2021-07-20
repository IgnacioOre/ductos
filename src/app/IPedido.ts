export interface Pedido {
    pedidoId: number;
    fechaIngreso: Date;
    fechaEntrega: Date;
    estado: string;
    telefono: string;
    presupuesto: number;
    email: string;
    indicaciones: string;
};
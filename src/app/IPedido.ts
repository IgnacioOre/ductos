export interface Pedido {
    pedidoId: number;
    fechaIngreso: Date;
    fechaEntrega: Date;
    estadoDelPedido: string;
    telefono: string;
    presupuesto: number;
    email: string;
    indicaciones: string;
};
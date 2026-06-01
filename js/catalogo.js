let carrito = [];

function agregar(nombre, precio){

    carrito.push({
        nombre,
        precio
    });

    alert(nombre + " agregado");
}

function generarTicket(){

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    let y = 20;
    let total = 0;

    doc.setFontSize(18);
    doc.text("TIENDA DEMO", 20, y);

    y += 20;

    carrito.forEach(item => {

        doc.setFontSize(12);

        doc.text(
            `${item.nombre} - $${item.precio}`,
            20,
            y
        );

        total += item.precio;
        y += 10;
    });

    y += 10;

    doc.setFontSize(14);

    doc.text(
        `TOTAL: $${total}`,
        20,
        y
    );

    doc.save("ticket.pdf");
}
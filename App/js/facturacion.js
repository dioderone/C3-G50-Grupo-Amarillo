function init() {
    listar();
    listarProductos();
    actualizarTablaDetalle()
    showForm(false);
}

function listar() {

    $('#tbl_facturacion').DataTable({
        data: [
            {'documento' : 'FAC-1', 'valor': '$45.000', 'fecha' : '2021-10-08'},
            {'documento' : 'FAC-2', 'valor': '$105.000',  'fecha' : '2021-10-04'},
            {'documento' : 'FAC-3', 'valor': '$100.000',  'fecha' : '2021-10-05'},
            {'documento' : 'FAC-4', 'valor': '$300.000',  'fecha' : '2021-10-06'},
        ],
        columns: [
            {data: 'documento', title: 'Documento'},
            {data: 'valor', title: 'Total'},
            {data: 'fecha', title: 'Factura'}
            
        ]
    })

}

function listarProductos() {

    $('#tbl_productos').DataTable({
        data: [

            {'producto' : 'Aguacate', 'valor' : '$2,500', 'accion' : `<button class="btn btn-sm btn-warning" onclick="agregarProducto(1, 'Aguacate', '2500')"><i class="fas fa-plus fa-lg"></i></button>`},
            {'producto' : 'Papas', 'valor' : '$1,500', 'accion' : `<button class="btn btn-sm btn-warning" onclick="agregarProducto(2, 'Papas', '1500')"><i class="fas fa-plus fa-lg"></i></button>`},
            {'producto' : 'Tomate', 'valor' : '$1,000', 'accion' : `<button class="btn btn-sm btn-warning" onclick="agregarProducto(2, 'Tomate', '1000')"><i class="fas fa-plus fa-lg"></i></button>`},
            {'producto' : 'Cebolla', 'valor' : '$1,500', 'accion' : `<button class="btn btn-sm btn-warning" onclick="agregarProducto(2, 'Cebolla', '1500')"><i class="fas fa-plus fa-lg"></i></button>`},
            {'producto' : 'Platano', 'valor' : '$1,800', 'accion' : `<button class="btn btn-sm btn-warning" onclick="agregarProducto(2, 'Platano', '1800')"><i class="fas fa-plus fa-lg"></i></button>`},

        ],
        columns: [
            {data: 'producto', title: 'Producto'},
            {data: 'valor', title: 'Valor'},
            {data: 'accion', title: 'Acción'},
        ]
    })

}

factura_detalle = [];

function agregarProducto(id_producto, nombre_producto, valor_producto) {

    let item = {
        id: id_producto,
        nombre: nombre_producto,
        cantidad: 1,
        valor: valor_producto,
        total: parseFloat(1 * valor_producto)
    };

    factura_detalle.push(item);
    actualizarTablaDetalle();
    //$('#modalProducto').modal('hide');

}

function actualizarTablaDetalle() {

    let str="";

    if(factura_detalle.length == 0) {

        str += `<tr><td colspan="5" class="text-center">¡No hay productos en el momento!</td></tr>`;

    } else {

        factura_detalle.map((item, index) => {

            str += `
                <tr>
                    <td><button type="button" class="btn btn-danger btn-sm" onclick="eliminarItem(${index})"><i class="fas fa-trash fa-lg"></i></button></td>
                    <td>${item.nombre}</td>
                    <td style="width: 40px;"><input id="txt_cantidad_${index}" type="number" class="form-control no-border" onkeyup="modificarValores(${index})" onchange="modificarValores(${index})" onkeyup="validarcantidad(${index})" value="${item.cantidad}"></td>
                    <td style="width: 200px;"><input id="txt_valor_${index}" type="text" class="form-control no-border" onkeyup="modificarValores(${index})" value="${item.valor}"></td>
                    <td><span id="total_${index}">$ ${item.total}</span></td>
                </tr>
            `;

        });


    }

    document.getElementById('tbl_factura_detalle').innerHTML = str;
    calcularSubTotal();


}

function modificarValores(index) {

    let cantidad =  document.getElementById(`txt_cantidad_${index}`).value;
    let valor = document.getElementById (`txt_valor_${index}`).value;

    if(cantidad <= 0){

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: (cantidad == 0) ? `<h4> La cantidad no puede ser  cero para el producto ${factura_detalle[index].nombre}</h4>` :`<h4>La cantidad no puede ser negativa para el producto ${factura_detalle[index].nombre}</h4>` ,
            confirmButtonColor: '#FFDA2F',
          }).then((result)=>{
              
            if (result.isConfirmed) {
            
            document.getElementById(`txt_cantidad_${index}`).value = 0;
            document.getElementById(`txt_valor_${index}`).value = 0;
            document.getElementById(`total_${index}`).innerHTML = '$0.00';
            factura_detalle[index].cantidad = 0;
            factura_detalle[index].valor = 0;
            factura_detalle[index].total = 0;

            calcularSubTotal();
        
            }

          });

    }else{

        let total = parseInt(cantidad * valor);
        factura_detalle[index].cantidad = cantidad;
        factura_detalle[index].valor = valor;
        factura_detalle[index].total = total;
        document.getElementById(`total_${index}`).innerHTML= total;

        calcularSubTotal();
        
    }
 
}

function calcularSubTotal() {

    let subtotal = 0.00;

    for (let i = 0; i < factura_detalle.length; i++) {

        subtotal += factura_detalle[i].cantidad * factura_detalle[i].valor;
    }

    document.getElementById('subtoltal').innerHTML = subtotal.toLocaleString('es-CO', {style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById('inputsubtotal').value=subtotal;

    calcularTotal();
}

function calcularTotal(){

    let iva = 0.00;
    let subtotal= 0.00;
    let total = 0.00;

    iva= parseFloat(document.getElementById('iva').value) *parseFloat(document.getElementById('inputsubtotal').value) / 100;
    subtotal = parseFloat(document.getElementById('inputsubtotal').value);
    total =  subtotal + iva;
    
    document.getElementById('totalfinal').innerHTML= total.toLocaleString('es-CO', {style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0});
}

function eliminarItem(index) {

    factura_detalle.splice(index, 1);
    actualizarTablaDetalle();
    modificarValores(index);
}

function showForm(bool) {

    if(bool) {

        $('#list-table').hide();
        $('#list-form').show();

    } else {

        $('#list-table').show();
        $('#list-form').hide();
    }

}


init();
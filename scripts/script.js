class PedidoDTO {
    constructor(cliente, telefone, doce, bebida, precoDoce, precoBebida){
        this.cliente = cliente;
        this.telefone = telefone;
        this.doce = doce;
        this.bebida = bebida;
        this.precoDoce = precoDoce;
        this.precoBebida = precoBebida;
    }

    validar() {
        if (!this.cliente){
            throw new Error("Nome Obrigatório");
        }
        if(!this.doce){
            throw new Error("Doce Obrigatório");
        }
        if(!this.telefone || this.telefone.length < 8){
            throw new Error("Número Inválido");
        }
        if(isNaN(this.precoDoce) || this.precoDoce <= 0){
            throw new Error("Preço Inválido");
        }
        return true;
    }
}

let pedidos = [];

const docePrecos = {
    "Brigadeiro":30,
    "Bolo de Cenoura":35,
    "Bolo de Laranja":40,
    "Palha Italiana":45,
    "Copo da Felicidade":50
};

const bebidaPrecos = {
    "Coca Cola":12,
    "Guarana":10,
    "Sprite":8
};

document.getElementById("doce").addEventListener("change", function(){
    document.getElementById("precoDoce").value = docePrecos [this.value] || "";
});
document.getElementById("bebida").addEventListener("change", function(){
    document.getElementById("precoBebida").value = bebidaPrecos [this.value] || "";
});

function adicionarPedido(){
    try{
        const cliente = document.getElementById("cliente").value;
        const telefone = document.getElementById("telefone").value;
        const doce = document.getElementById("doce").value;
        const bebida = document.getElementById("bebida").value;
        const precoDoce = parseFloat(document.getElementById("precoDoce").value) || 0;
        const precoBebida = parseFloat(document.getElementById("precoBebida").value) || 0;

        const pedido = new PedidoDTO(cliente, telefone, doce, bebida, precoDoce, precoBebida);
        pedido.validar();

        pedidos.push(pedido);

        atualizarLista();

        document.getElementById("cliente").value = "";
        document.getElementById("telefone").value = "";
        document.getElementById("doce").value = "";
        document.getElementById("bebida").value = "";
        document.getElementById("precoDoce").value = "";
        document.getElementById("precoBebida".value) = "";

    }catch(erro){
        alert(erro.message);
    }
}

function atualizarLista(){
    const lista = document.getElementById("listaPedidos");
    lista.innerHTML = "";

    pedidos.forEach((p) => {
        const li = document.createElement("li");
        
        li.innerHTML = `
            Cliente: ${p.cliente} <br>
            Doce: ${p.doce} <br>
            Bebida: ${p.bebida} <br>
            Preço: R$ ${(p.precoDoce + p.precoBebida).toFixed(2)}
        `;

        lista.appendChild(li);
    });

    const total = pedidos.reduce((soma, p) => soma + (p.precoDoce + p.precoBebida),0);
    document.getElementById("totalPedidos").innerText = "Total: R$" + total.toFixed(2);   
}
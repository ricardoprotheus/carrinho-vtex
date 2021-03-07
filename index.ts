// Retorna pre�o por ID
const catalogo = {};
// Retorna vendedor por ID de produto
const vendedores = {};
// Retorna comiss�o por ID de vendedor 
const vendedor_comissao = {};

const carrinho = {};

var preco = 0;
// Comiss�o VTEX
var valor_credito_vtex = 0;
// Comiss�o Vendedor
var valor_credito_vendedor = {};

interface Produto {
    id: string,
    valor: number,
    quantidade: number,
    vendedor: string,
}

function adicionarCarrinho(id: string) {

    if ( !(id in carrinho) ) {
        carrinho[id] = {
            id,
            preco: catalogo[id],
            quantidade: 0,
            vendedor: vendedores[id],
        }
    }

    // Incrementa Quantidade e Pre�o do Produto
    carrinho[id].quantidade++;
    preco += carrinho[id].valor;

    // ID do Vendedor
    const vendedorId = carrinho[id].vendedor;   
    // Calculo da Comiss�o VTEX
    valor_credito_vtex += ( carrinho[id].valor * vendedor_comissao[vendedorId] );
    // Calculo da Comiss�o Vendedor
    valor_credito_vendedor[vendedorId] += ( carrinho[id].valor * ( 1 - vendedor_comissao[vendedorId]) );

}

function removerCarrinho(id: string) {

    if ( !(id in carrinho) ) return;

    // Incrementa Quantidade e Pre�o do Produto
    carrinho[id] = null;
    preco -= carrinho[id].valor

    // ID do Vendedor
    const vendedorId = carrinho[id].vendedor;   
    // Calculo da Comiss�o VTEX
    valor_credito_vtex -= ( carrinho[id].valor * vendedor_comissao[vendedorId] );
    // Calculo da Comiss�o Vendedor
    valor_credito_vendedor[vendedorId] -= ( carrinho[id].valor * ( 1 - vendedor_comissao[vendedorId]) );
    
}

function modificarCarrinho(id: string, quantidade: number) {

    if ( !(id in carrinho) ) return;

    // Incrementa Quantidade e Pre�o do Produto
    const quantidade_antiga = carrinho[id].quantidade;
    preco += ( quantidade - quantidade_antiga ) * carrinho[id].valor;
    carrinho[id].quantidade = quantidade;

    // ID do Vendedor
    const vendedorId = carrinho[id].vendedor;   
    // Calculo da Comiss�o VTEX
    valor_credito_vtex += ( quantidade - quantidade_antiga ) * ( carrinho[id].valor * vendedor_comissao[vendedorId] );
    // Calculo da Comiss�o Vendedor
    valor_credito_vendedor[vendedorId] += ( quantidade - quantidade_antiga ) * ( carrinho[id].valor * ( 1 - vendedor_comissao[vendedorId]) );
    
}

function precoCarrinho() {

    return preco;

}

function valorCreditoVtex() {

    return valor_credito_vtex;
}

function valorCreditoVendedor(id: string) {

    return valor_credito_vendedor[id];

}
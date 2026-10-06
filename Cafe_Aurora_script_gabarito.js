 // =====================================================
//  Café Aurora · script.js · GABARITO COMPLETO
// =====================================================

function formatarReais(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

// PASSO 1 · SELECIONAR OS ELEMENTOS
const form = document.querySelector('#form-pedido');

const inputNome = document.querySelector('#nome-cliente');
const selectItem = document.querySelector('#item');
const inputQtd = document.querySelector('#quantidade');
const inputObs = document.querySelector('#observacao');

const erroNome = document.querySelector('#erro-nome');
const erroItem = document.querySelector('#erro-item');
const erroQtd = document.querySelector('#erro-quantidade');

const lista = document.querySelector('#lista-pedidos');
const listaVazia = document.querySelector('#lista-vazia');
const contador = document.querySelector('#contador-pedidos');
const textoTotalGeral = document.querySelector('#total-geral');

let totalGeral = 0;

// PASSO 7 (parte) · função que atualiza contador, total e "lista vazia"
function atualizarResumo() {
  const quantidadePedidos = lista.children.length;

  contador.textContent = quantidadePedidos;
  textoTotalGeral.textContent = formatarReais(totalGeral);

  if (quantidadePedidos === 0) {
    listaVazia.classList.remove('escondido');
  } else {
    listaVazia.classList.add('escondido');
  }
}

// PASSO 2 · OUVIR O ENVIO DO FORMULÁRIO
form.addEventListener('submit', function (evento) {
  evento.preventDefault();

  // PASSO 3 · LER OS CAMPOS
  const nome = inputNome.value.trim();
  const item = selectItem.value;
  const quantidade = Number(inputQtd.value);
  const observacao = inputObs.value.trim();

  // PASSO 4 · VALIDAR
  let valido = true;

  if (nome === '') {
    erroNome.textContent = 'Digite seu nome.';
    inputNome.classList.add('campo-invalido');
    valido = false;
  } else {
    erroNome.textContent = '';
    inputNome.classList.remove('campo-invalido');
  }

  if (item === '') {
    erroItem.textContent = 'Escolha um produto.';
    selectItem.classList.add('campo-invalido');
    valido = false;
  } else {
    erroItem.textContent = '';
    selectItem.classList.remove('campo-invalido');
  }

  if (quantidade < 1 || quantidade > 10) {
    erroQtd.textContent = 'A quantidade deve ser de 1 a 10.';
    inputQtd.classList.add('campo-invalido');
    valido = false;
  } else {
    erroQtd.textContent = '';
    inputQtd.classList.remove('campo-invalido');
  }

  if (valido === false) {
    return;
  }

  // PASSO 5 · CALCULAR O TOTAL DO PEDIDO
  const opcao = selectItem.options[selectItem.selectedIndex];
  const preco = Number(opcao.dataset.preco);
  const totalPedido = preco * quantidade;

  // PASSO 6 · CRIAR O CARD DO PEDIDO
  const card = document.createElement('li');
  card.classList.add('pedido');

  const titulo = document.createElement('strong');
  titulo.classList.add('pedido-nome');
  titulo.textContent = nome;

  const descricao = document.createElement('span');
  descricao.classList.add('pedido-desc');
  descricao.textContent = quantidade + 'x ' + item;

  const valor = document.createElement('span');
  valor.classList.add('pedido-total');
  valor.textContent = formatarReais(totalPedido);

  card.appendChild(titulo);
  card.appendChild(descricao);
  card.appendChild(valor);

  // EXTENSÃO A · OBSERVAÇÃO OPCIONAL
  if (observacao !== '') {
    const obs = document.createElement('em');
    obs.classList.add('pedido-obs');
    obs.textContent = 'Obs.: ' + observacao;
    card.appendChild(obs);
  }

  // EXTENSÃO B · BOTÃO REMOVER
  const botaoRemover = document.createElement('button');
  botaoRemover.type = 'button';
  botaoRemover.classList.add('btn-remover');
  botaoRemover.textContent = 'Remover';

  botaoRemover.addEventListener('click', function () {
    card.remove();
    totalGeral = totalGeral - totalPedido;
    atualizarResumo();
  });

  card.appendChild(botaoRemover);

  lista.appendChild(card);

  // PASSO 7 · LIMPAR E ATUALIZAR
  totalGeral = totalGeral + totalPedido;
  atualizarResumo();

  form.reset();
  inputNome.focus();
});

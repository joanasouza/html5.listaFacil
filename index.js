/**
* Projeto criado por Walter Gandarella
* walter.wgbn@gmail.com
 */
(function() {
    var _teclado    = document.querySelector('div.teclado');
    var _botoes     = document.getElementsByClassName('botao');
    var _lista      = document.getElementsByClassName('lista-item');
    var _liberado   = false;
    var _arr        = [];
    var _config     = {itemAtual: 0, campoAtual: 0, campoTemp: ''}

    primeiraLista();
    carregaLista();

    document.querySelector('html').addEventListener('click', function(){
        if (!_liberado){
            _teclado.classList.remove('teclado-show');
            document.querySelector('.lista').classList.remove('lista-teclado');
            limpaLista();
        }
    });

    for (var i = 0; i < _lista.length; i++){
        _lista[i].addEventListener('click', selLista);
    }

    for (var i = 0; i < _botoes.length; i++){
        _botoes[i].addEventListener('click', botaoTeclado);
    }

    function selLista(){
        limpaLista();
        this.classList.add('lista-selected');
        _teclado.classList.add('teclado-show');
        document.querySelector('.lista').classList.add('lista-teclado');

        this.childNodes[1].childNodes[0].classList.add('preco-ativo');

        _liberado = true;
        _config.itemAtual = parseInt(this.getAttribute('data-id'));

        var _rect = this.getBoundingClientRect();

        window.setTimeout(function(){
            _liberado = false;

            var _rbody = document.body.getBoundingClientRect();
            var _ancor = document.getElementById('ancora').getBoundingClientRect();
            if (_rect.top - _rbody.top > 425){
                window.scrollTo(_ancor.top - _rbody.top, 0);
            }
        }, 200);
    }

    function proxCampo(){
        _lista[_config.itemAtual].childNodes[1].childNodes[_config.campoAtual].classList.remove('preco-ativo');

        if (_config.campoAtual == 0){
            if (_config.campoTemp != '')
                _arr[_config.itemAtual].valor = parseFloat(_config.campoTemp);
            _config.campoAtual++;
            _config.campoTemp = '';
            _lista[_config.itemAtual].childNodes[1].childNodes[_config.campoAtual].classList.add('preco-ativo');
            //console.log(_arr[_config.itemAtual]);
        } else if (_config.campoAtual == 1){
            if (_config.campoTemp != '')
                _arr[_config.itemAtual].qtde = parseFloat(_config.campoTemp);

            _liberado = false;
            concluiEdicao();
            //console.log(_arr[_config.itemAtual]);
        }

    }

    function concluiEdicao(){
        document.getElementById('total-'+_config.itemAtual).innerHTML = 'R$ '+(parseFloat(_arr[_config.itemAtual].valor) * parseFloat(_arr[_config.itemAtual].qtde)).toFixed(2);
        _config.campoAtual = 0;
        _config.campoTemp = '';
        console.log('limpaLista()');
        limpaLista();
    }

    function limpaLista(){
        for (var i = 0; i < _lista.length; i++){
            _lista[i].classList.remove('lista-selected');

            _lista[i].childNodes[1].childNodes[0].classList.remove('preco-ativo');
            _lista[i].childNodes[1].childNodes[1].classList.remove('preco-ativo');
            _lista[i].childNodes[1].childNodes[2].classList.remove('preco-ativo');
        }
    }

    function botaoTeclado(){
        var _val = this.getAttribute('data-valor');
        _liberado = true;

        switch(_val){
                case 'ok':
                    proxCampo();
                    break;

                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                case '.':
                    _config.campoTemp += _val;
                    if (_config.campoAtual == 0) {
                        document.getElementById('preco-'+_config.itemAtual).innerHTML = 'R$ '+_config.campoTemp+' / '+_arr[_config.itemAtual].unidadeValor;
                    } else {
                        document.getElementById('qtde-'+_config.itemAtual).innerHTML = _config.campoTemp+' '+_arr[_config.itemAtual].unidadeQtde;
                    }
                    break;

                case 'kg':
                case 'g':
                case 'l':
                case 'ml':
                case 'un':
                    if (_config.campoAtual == 0){
                        _arr[_config.itemAtual].unidadeValor = _val;
                        document.getElementById('preco-'+_config.itemAtual).innerHTML = 'R$ '+_config.campoTemp+' / '+_arr[_config.itemAtual].unidadeValor;
                    } else {
                        _arr[_config.itemAtual].unidadeQtde = _val;
                        document.getElementById('qtde-'+_config.itemAtual).innerHTML = _config.campoTemp+' '+_arr[_config.itemAtual].unidadeQtde;
                    }
                    break;

                case 'c':
                    limpaLista();
                    _liberado = false;
                    break;
        }

        window.setTimeout(function(){ _liberado = false; }, 200);
    }

    function primeiraLista(){
        _arr.push({item: 'Tomate vermelho', valor: 1.5, unidadeValor: 'kg', qtde: 1, unidadeQtde: 'g'});
        _arr.push({item: 'Leite UHT', valor: 2.5, unidadeValor: 'l', qtde: 1, unidadeQtde: 'l'});
        _arr.push({item: 'Biscoito', valor: 1.9, unidadeValor: 'un', qtde: 1, unidadeQtde: 'un'});
        _arr.push({item: 'Arroz', valor: 2.35, unidadeValor: 'kg', qtde: 1, unidadeQtde: 'kg'});
        _arr.push({item: 'Tomate vermelho', valor: 1.5, unidadeValor: 'kg', qtde: 1, unidadeQtde: 'g'});
        _arr.push({item: 'Leite UHT', valor: 2.5, unidadeValor: 'l', qtde: 1, unidadeQtde: 'l'});
        _arr.push({item: 'Biscoito', valor: 1.9, unidadeValor: 'un', qtde: 1, unidadeQtde: 'un'});
        _arr.push({item: 'Arroz', valor: 2.35, unidadeValor: 'kg', qtde: 1, unidadeQtde: 'kg'});
        _arr.push({item: 'Tomate vermelho', valor: 1.5, unidadeValor: 'kg', qtde: 1, unidadeQtde: 'g'});
        _arr.push({item: 'Leite UHT', valor: 2.5, unidadeValor: 'l', qtde: 1, unidadeQtde: 'l'});
        _arr.push({item: 'Biscoito', valor: 1.9, unidadeValor: 'un', qtde: 1, unidadeQtde: 'un'});
        _arr.push({item: 'Arroz', valor: 2.35, unidadeValor: 'kg', qtde: 1, unidadeQtde: 'kg'});
    }

    function carregaLista(){
        var _ht = '';

        for (var i = 0; i < _arr.length; i++){
            _ht += '<li class="lista-item" data-id="'+i+'" id="item-'+i+'">';
                _ht += '<div class="linha clearfix">';
                    _ht += '<input type="checkbox">';
                    _ht += '<div class="item">'+_arr[i].item+'</div>';
                _ht += '</div>';
                _ht += '<div class="linha clearfix datalhes">';
                    _ht += '<span class="preco" id="preco-'+i+'">R$ '+_arr[i].valor+' / '+_arr[i].unidadeValor+'</span>';
                    _ht += '<span id="qtde-'+i+'">'+_arr[i].qtde+' '+_arr[i].unidadeQtde+'</span>';
                    _ht += '<span id="total-'+i+'">R$ '+(_arr[i].valor * _arr[i].qtde)+'</span>';
                _ht += '</div>';
            _ht += '</li>';
        }

        var _items = document.getElementById('items');
        _items.innerHTML = _ht;
    }
})();

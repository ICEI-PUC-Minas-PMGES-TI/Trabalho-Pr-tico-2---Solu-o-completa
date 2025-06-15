let dados;

function deleteCard(id) {
  fetch(`http://localhost:3000/noticias/${id}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(dadosResponse => {

    })
    .catch(error => console.error('Erro ao deletar o card com id:', id));
}

function editCard(id) {

}

function setDestaqueCards(cards) {

  const cardsContainer = document.getElementById('cards-contrast');
  const indicatorsContainer = document.querySelector('.carousel-indicators');

  cardsContainer.innerHTML = '';
  indicatorsContainer.innerHTML = '';

  cards.forEach((card, index) => {
    let cardDestaque = document.createElement('div');
    let cardImage = document.createElement('img');
    let carouselOption = document.createElement('div');
    let titleCarousel = document.createElement('h5');
    let descriptionCarousel = document.createElement('p');

    cardDestaque.classList.add('carousel-item');
    if (index === 0) {
      cardDestaque.classList.add('active');
    }

    cardImage.classList.add('d-block', 'w-100', 'img-contrast-card');
    cardImage.src = card.imagem_pincipal;
    carouselOption.classList.add('carousel-caption', 'd-none', 'd-md-block');

    titleCarousel.innerText = card.titulo;
    descriptionCarousel.innerText = card.descricao;

    cardDestaque.appendChild(cardImage);
    cardDestaque.appendChild(carouselOption);
    carouselOption.appendChild(titleCarousel);
    carouselOption.appendChild(descriptionCarousel);

    cardsContainer.appendChild(cardDestaque);

    let indicator = document.createElement('button');
    indicator.type = 'button';
    indicator.setAttribute('data-bs-target', '#carouselExampleCaptions');
    indicator.setAttribute('data-bs-slide-to', index);
    indicator.setAttribute('aria-label', `Slide ${index + 1}`);
    if (index === 0) {
      indicator.classList.add('active');
    }
    indicatorsContainer.appendChild(indicator);
  });

  let carousel = new bootstrap.Carousel(document.getElementById('carouselExampleCaptions'));
  carousel.dispose();
  carousel = new bootstrap.Carousel(document.getElementById('carouselExampleCaptions'));
}

function setCards(card) {
  let divCard = document.createElement('div');
  divCard.classList.add('card', 'btn', 'btn-primary', 'mb-3');
  let cardImage = document.createElement('img');
  let name = document.createElement('div');
  let description = document.createElement('div');
  let category = document.createElement('div');
  let data = document.createElement('div');
  let autor = document.createElement('div');
  let buttonDelete = document.createElement('button');
  let buttonEdit = document.createElement('button');
  name.classList.add('info');
  description.classList.add('info');
  category.classList.add('info');
  data.classList.add('info');
  autor.classList.add('info');

  cardImage.src = card.imagem_pincipal;
  name.innerHTML = `<b>Titulo:</b><p>${card.titulo}</p>`;
  description.innerHTML = `<b>Descrição:</b><p>${card.descricao}</p>`;
  category.innerHTML = `<b>Categoria:</b><p>${card.categoria}</p>`;
  data.innerHTML = `<b>Data:</b><p>${card.data}</p>`;
  autor.innerHTML = `<b>Autor:</b><p>${card.autor}</p>`;
  buttonDelete.innerHTML = '<span class="material-icons md-24">delete</span>';
  buttonEdit.innerHTML = '<span class="material-icons md-24">edit</span>';

  divCard.appendChild(cardImage);
  divCard.appendChild(name);
  divCard.appendChild(description);
  divCard.appendChild(category);
  divCard.appendChild(autor);
  divCard.appendChild(data);
  divCard.appendChild(buttonDelete);
  divCard.appendChild(buttonEdit);

  divCard.addEventListener('click', function () {
    window.location.href = `./detalhes.html?id=${card.id}`;;
  });

  buttonDelete.addEventListener('click', function (event) {
    event.stopPropagation();
    deleteCard(card.id);
  });

  buttonEdit.addEventListener('click', function (event) {
    event.stopPropagation();

    document.getElementById('editModal').style.display = 'flex';

    document.getElementById('editTitulo').value = card.titulo;
    document.getElementById('editDescricao').value = card.descricao;
    document.getElementById('editCategoria').value = card.categoria;
    document.getElementById('editData').value = card.data;
    document.getElementById('editAutor').value = card.autor;

    const form = document.getElementById('editForm');
    form.onsubmit = function (e) {
      e.preventDefault();


      fetch(`http://localhost:3000/noticias/${card.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: card.id,
          titulo: document.getElementById('editTitulo').value,
          descricao: document.getElementById('editDescricao').value,
          categoria: document.getElementById('editCategoria').value,
          data: document.getElementById('editData').value,
          autor: document.getElementById('editAutor').value,
          imagem_pincipal: card.imagem_pincipal,
          imagens_complementares: card.imagens_complementares
        })
      })
        .then(dadosResponse => {
          card.titulo = document.getElementById('editTitulo').value;
          card.descricao = document.getElementById('editDescricao').value;
          card.categoria = document.getElementById('editCategoria').value;
          card.data = document.getElementById('editData').value;
          card.autor = document.getElementById('editAutor').value;

          document.getElementById('editModal').style.display = 'none';
        })
        .catch(error => console.error('Erro ao deletar o card com id:', id));


      console.log('Card editado:', card);
    };
  });


  document.getElementById('cards').appendChild(divCard);
}

function onInit() {

  fetch('http://localhost:3000/noticias')
    .then(response => response.json())
    .then(dadosResponse => {
      dados = dadosResponse;
      for (let dado of dados) {
        setCards(dado);
      }

      setDestaqueCards(dados.filter((x => x.destaque === true)));
    })
    .catch(error => console.error('Erro ao carregar os dados:', error));


}

document.addEventListener('DOMContentLoaded', function () {
  onInit();
});
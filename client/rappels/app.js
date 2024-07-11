const app = {
  init() {
    app.addEventListeners();
  },

  addEventListeners() {
    /** Toggle du formulaire **/
    // Récupération d'élément HTML
    const buttonToggleFormElm = document.getElementById(
      'buttonToggleSearchForm',
    );

    // Ajout d'un écouteur d'événement
    buttonToggleFormElm.addEventListener(
      'click',
      app.handleClickButtonToggleForm,
    );

    /** Soumission du formulaire de recherche **/
    const searchFormElm = document.getElementById('searchForm');
    searchFormElm.addEventListener('submit', app.handleSubmitSearchForm);
  },

  handleClickButtonToggleForm() {
    const searchFormElm = document.getElementById('searchForm');

    // Ajout ou suppression de la classe 'hidden'
    searchFormElm.classList.toggle('hidden');
  },

  async handleSubmitSearchForm(event) {
    // J'empêche le comportement par défaut du formulaire (rechargement de la page)
    event.preventDefault();

    // Je récupérer l'élément sur lequel l'événement a été attaché
    const formElm = event.currentTarget;

    // formData va être un objet contenant les données du formulaire
    // Cependant les données sont accessibles qu'en utilisant la méthode `get` de formData
    // on passe en argument du `get` la valeur de l'attribut `name` de l'input
    // formData.get('searchText') => 'valeur du champ search'
    const formData = new FormData(formElm);

    // Pour transformer formData en un objet classique
    const data = Object.fromEntries(formData);

    try {
      const cities = await app.fetchCities(data.searchText);

      // Je récupère l'élément HTML dans lequel je vais ajouter les villes
      const citiesElm = document.getElementById('cities');
      // Je retire tous les éléments HTML qu'il y avait à l'intérieur
      citiesElm.textContent = '';
      // Pour chaque commune
      cities.forEach((city) => {
        // Je crée un élément HTML pour la commune
        const cityElm = app.createCityElm(city);
        // J'ajoute l'élément HTML de ma commune dans ma liste de communes
        citiesElm.append(cityElm);
      });
    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue lors de la récupération des villes');
    }
  },

  async fetchCities(departmentCode) {
    const response = await fetch(
      `https://geo.api.gouv.fr/departements/${departmentCode}/communes`,
    );
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    // Je vais récupérer les données de la réponse
    const cities = await response.json();

    return cities;
  },

  createCityElm(city) {
    const cityElm = document.createElement('li');
    cityElm.textContent = `${city.code} - ${city.nom}: ${city.population} habitants`;
    return cityElm;
  },
};

app.init();

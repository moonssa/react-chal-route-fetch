const BASE_PATH = "https://disney_api.nomadcoders.workers.dev/characters";

export function getCharacters() {
  return fetch(BASE_PATH).then((response) => response.json());
}

export function getCharacterById(id: number) {
  return fetch(BASE_PATH + "/" + id).then((response) => response.json());
}

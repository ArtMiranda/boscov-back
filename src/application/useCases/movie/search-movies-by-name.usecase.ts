export class SearchMoviesByNameUseCase {
  private constructor() {}

  static makeUseCase() {
    return new SearchMoviesByNameUseCase();
  }

  async execute(query: string) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=pt-BR&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.TMDB_API_KEY!,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      return;
    }
  }
}

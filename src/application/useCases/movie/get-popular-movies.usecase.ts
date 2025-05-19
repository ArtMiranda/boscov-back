export class GetPopularMoviesUseCase {
  private constructor() {}

  static makeUseCase() {
    return new GetPopularMoviesUseCase();
  }

  async execute(page: number = 1) {
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=${page}`;
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

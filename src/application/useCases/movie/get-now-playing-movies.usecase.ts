export class GetNowPlayingMoviesUseCase {
  private constructor() {}

  static makeUseCase() {
    return new GetNowPlayingMoviesUseCase();
  }

  async execute(page: number = 1) {
    const url = `https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=${page}`;
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

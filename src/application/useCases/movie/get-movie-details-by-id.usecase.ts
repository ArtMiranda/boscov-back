export class GetMovieDetailsByIdUseCase {
  private constructor() {}

  static makeUseCase() {
    return new GetMovieDetailsByIdUseCase();
  }

  async execute(movieId: number) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`;
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

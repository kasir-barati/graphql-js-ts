export interface SomethingPartialResponse {
  error: {
    message: string;
    location: { line: number; column: number }[];
    path: string[];
  }[];
  data: {
    something: {
      message: string;
      getDie: null;
    };
  };
}

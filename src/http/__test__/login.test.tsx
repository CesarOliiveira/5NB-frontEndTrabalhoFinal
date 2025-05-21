
import { handleLogin, handleRegexLogin, IResponse, isResponseTrue} from '../client/login'
import axios from 'axios';

jest.mock('react-native', () => ({
   Alert: {
      alert: jest.fn(),
   },
}));

jest.mock('expo-router', () => ({
   router: {
      replace: jest.fn(),
   },
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve(null)),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve(null)),
  clear: jest.fn(() => Promise.resolve(null)),
  getAllKeys: jest.fn(() => Promise.resolve([])),
}));

jest.mock('@/src/db/credentials', () => ({
  DB_URL: 'http://192.168.18.9:8080', // Valor mockado para o URL da sua API
}));


describe('handleRegexLogin', () => {

   beforeEach(() => {
      jest.clearAllMocks();  // Limpa todos os mocks antes de cada teste
   });

   it("Verificar email e senha se está no padrão do regex", () => {
      const login = {
         email: "teste@gmail.com",
         password: "teste123"
      }

      expect(handleRegexLogin(login.email, login.password)).toBe(true)
   })

   it("Verifica se o regex do email não foi de forma correta", () => {
      const login = {
         email: "teste@gmail",
         password: "teste123"
      }

      expect(handleRegexLogin(login.email, login.password)).toBe(false)
   })
})


describe("handleLogin", () => {
   beforeEach(() => {
      jest.clearAllMocks();  // Limpa todos os mocks antes de cada teste
   });

   it("Verificar se o login foi feito de forma correta", async () => {
      const login = {
         email: "teste@gmail.com",
         password: "teste123"
      };

      // Criando o mock manualmente para axios.post
      const axiosPostMock = jest.spyOn(axios, 'post').mockResolvedValue({
         data: { status: true }
      });

      // Chama a função handleLogin
      await expect(handleLogin(login.email, login.password)).resolves.toEqual({ status: true });


      // Limpa os mocks após o teste
      axiosPostMock.mockRestore();
   });

   it("Verificar se o login foi feito de forma incorreta", async () => {
      const login = {
         email: "test@gmail.com",
         password: "teste123"
      };

      // Criando o mock manualmente para axios.post
      const axiosPostMock = jest.spyOn(axios, 'post').mockResolvedValue({
         data: { status: false }
      });

      // Chama a função handleLogin
      await expect(handleLogin(login.email, login.password)).resolves.toEqual({ status: false });


      // Limpa os mocks após o teste
      axiosPostMock.mockRestore();
   });

   it("Se retornar a resposta verdadeira de login", () => {
      const response : IResponse = {
         email: "test@gmail.com",
         token: "dhdnsasauduah",
         status: true
      };

      expect(isResponseTrue(response)).toBeTruthy();
   });

})


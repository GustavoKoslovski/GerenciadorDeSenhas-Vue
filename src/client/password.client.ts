import axios, { AxiosInstance } from "axios";
import { Password } from "@/model/password";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";


export class PasswordClient {

    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/password',
            headers: {'Content-type' : 'application/json'}
        });
    }

    public async findById(id: number) : Promise<Password> {
        try {
            return (await this.axiosClient.get<Password>(`/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

	public async listar(): Promise<Password[]> {
        try{
            return(await this.axiosClient.get('/')).data
        } catch(error:any){
            return Promise.reject(error.response)
        }
    }


	public async cadastrar(password: Password): Promise<void> {
		try {
			return (await this.axiosClient.post('/', password))
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async editar(password: Password): Promise<void> {
		try {
			return (await this.axiosClient.put(`/${password.id}`, password)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async desativar(password: Password): Promise<void> {
		try {
			return (await this.axiosClient.put(`/desativar/${password.id}`, password)).data
		} catch (error:any) {
			return Promise.reject(error.response)
		}
	}

	public async findByFiltrosPaginado(pageRequest: PageRequest): Promise<PageResponse<Password>> {
		try {
			let requestPath = ''

			requestPath += `?page=${pageRequest.currentPage}`
			requestPath += `&size=${pageRequest.pageSize}`
			requestPath += `&sort=${pageRequest.sortField === undefined ? '' : pageRequest.sortField},${pageRequest.direction}`

			return (await this.axiosClient.get<PageResponse<Password>>(requestPath, { params: { filtros: pageRequest.filter } })).data
		} catch (error:any) { 
			return Promise.reject(error.response) 
		}
	}

	public async deletar(password: Password): Promise<void> {
        try {
            return (await this.axiosClient.delete(`/${password.id}`, password)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

}
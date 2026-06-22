//src\services\empresas\empresa-service.ts
import { api } from "@/lib/axios/api";
import type { PaginatedResponse } from "@/types/api/paginated-response";
import type { EmpresaDTO } from "./dtos/empresa.dto";
import type { CreateEmpresaDTO } from "./dtos/create-empresa.dto";
import type { UpdateEmpresaDTO } from "./dtos/update-empresa.dto";
import type { FindEmpresasParamsDTO } from "./dtos/find-empresas-params.dto";

const BASE_URL = "/tenants";

export const empresaService = {
  async findAll(params?: FindEmpresasParamsDTO): Promise<PaginatedResponse<EmpresaDTO>> {
    const response = await api.get<PaginatedResponse<EmpresaDTO>>(
      BASE_URL, {
      params: {
        page: params?.page ?? 1,
        limit: params?.limit ?? 10,
        search: params?.search || undefined,
      },
    });

    return response.data;
  },

  async create(payload: CreateEmpresaDTO): Promise<EmpresaDTO> {
    const response = await api.post<EmpresaDTO>(BASE_URL, payload);

    return response.data;
  },

  async update(id: string, payload: UpdateEmpresaDTO): Promise<EmpresaDTO> {
    const response = await api.put<EmpresaDTO>(`${BASE_URL}/${id}`, payload);

    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`${BASE_URL}/${id}`);
  },
};

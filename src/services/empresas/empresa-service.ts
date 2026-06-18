import { httpClient } from "@/services/http/http-client";
import type { ApiResponse } from "@/types/api/api-response";
import type { EmpresaDTO } from "./dtos/empresa.dto";
import type { CreateEmpresaDTO } from "./dtos/create-empresa.dto";
import type { UpdateEmpresaDTO } from "./dtos/update-empresa.dto";

export const empresaService = {
  async findAll() {
    const { data } = await httpClient.get<ApiResponse<EmpresaDTO[]>>("/tenants");

    return data.data;
  },

  async create(payload: CreateEmpresaDTO) {
    const { data } = await httpClient.post<ApiResponse<EmpresaDTO>>("/tenants", payload);

    return data.data;
  },

  async update(id: string, payload: UpdateEmpresaDTO) {
    const { data } = await httpClient.put<ApiResponse<EmpresaDTO>>(`/tenants/${id}`, payload);

    return data.data;
  },

  async delete(id: string) {
    await httpClient.delete(`/tenants/${id}`);
  },
};

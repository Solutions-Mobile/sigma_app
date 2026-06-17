import { httpClient } from "@/services/http/http-client";
import type { ApiResponse } from "@/types/api/api-response";
import type { EmpresaDTO } from "./dtos/empresa.dto";

export const empresaService = {
  async findAll() {
    const { data } =
      await httpClient.get<
        ApiResponse<EmpresaDTO[]>
      >("/tenants");

    return data.data;
  },
};

/*
import { httpClient } from "@/services/http/http-client";
import type { EmpresaDTO } from "./dtos/empresa.dto";

export const empresaService = {
  async findAll() {
    const { data } = await httpClient.get<EmpresaDTO[]>("/tenants");

    return data;
  },
};
*/
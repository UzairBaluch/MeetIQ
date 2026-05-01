import * as systemRepository from "../repositories/system.repository.js";

export function getServiceOverview(): { service: string; env: string } {
  return {
    service: systemRepository.getServiceName(),
    env: systemRepository.getPublicNodeEnv(),
  };
}

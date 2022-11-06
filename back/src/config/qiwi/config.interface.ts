export interface IQiwiConfigService {
  get host(): string

  get key(): string

  get adminPhone(): number
}

export const IQiwiConfigService = Symbol('IQiwiConfigService')

import { verify } from 'jsonwebtoken'
import { Photon } from '@prisma/photon'
import { ContextParameters } from 'graphql-yoga/dist/types'


const photon = new Photon()

export interface Context {
  photon: Photon
  request: any
  userId: any
}

export function createContext(request: ContextParameters) {
  return {
    ...request,
    photon,
  }
}

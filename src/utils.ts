import { verify } from 'jsonwebtoken'
import { Photon } from '@prisma/photon'
import { ContextParameters } from 'graphql-yoga/dist/types'
import { scalarType } from 'nexus'
import Bignumber from 'bignumber.js';


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
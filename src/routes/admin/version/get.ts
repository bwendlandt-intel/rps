/*********************************************************************
 * Copyright (c) Intel Corporation 2022
 * SPDX-License-Identifier: Apache-2.0
 **********************************************************************/

import { ServiceVersion, ProtocolVersion } from '../../../utils/constants'
import { type Request, type Response } from 'express'

export function getVersion (req: Request, res: Response): void {
  const response = {
    serviceVersion: ServiceVersion,
    protocolVersion: ProtocolVersion
  }
  res.status(200).json(response).end()
}

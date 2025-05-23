/*********************************************************************
 * Copyright (c) Intel Corporation 2022
 * SPDX-License-Identifier: Apache-2.0
 **********************************************************************/

import { type IDB } from '../../interfaces/database/IDb'
import { Pool, type QueryResult } from 'pg'
import Logger from '../../Logger'
import { CiraConfigTable } from './tables/ciraConfigs'
import { ProfilesTable } from './tables/profiles'
import { DomainsTable } from './tables/domains'
import { ProfilesWifiConfigsTable } from './tables/profileWifiConfigs'
import { WirelessProfilesTable } from './tables/wirelessProfiles'
import { IEEE8021xProfilesTable } from './tables/ieee8021xProfiles'

export default class Db implements IDB {
  pool: Pool
  ciraConfigs: CiraConfigTable
  domains: DomainsTable
  profiles: ProfilesTable
  wirelessProfiles: WirelessProfilesTable
  profileWirelessConfigs: ProfilesWifiConfigsTable
  ieee8021xProfiles: IEEE8021xProfilesTable

  log: Logger = new Logger('PostgresDb')

  constructor (connectionString: string) {
    this.pool = new Pool({
      connectionString
    })
    this.ciraConfigs = new CiraConfigTable(this)
    this.profiles = new ProfilesTable(this)
    this.domains = new DomainsTable(this)
    this.wirelessProfiles = new WirelessProfilesTable(this)
    this.profileWirelessConfigs = new ProfilesWifiConfigsTable(this)
    this.ieee8021xProfiles = new IEEE8021xProfilesTable(this)
  }

  async query<T>(text: string, params?: any): Promise<QueryResult<T>> {
    const start = Date.now()
    const res = await this.pool.query<T>(text, params)
    const duration = Date.now() - start
    this.log.verbose(`executed query: ${JSON.stringify({ text, duration, rows: res.rowCount })}`)
    return res
  }
}

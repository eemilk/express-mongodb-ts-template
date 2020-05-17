import {
    cleanEnv, str,
} from 'envalid'
import { prototype } from 'module'

function validateEnv() {
    cleanEnv(process.env, {
        DBPASS: str(),
        DBPATH: str(),
        DBUSER: str(),
    })
}

export default validateEnv
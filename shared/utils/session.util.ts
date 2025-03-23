import type {User} from "@prisma/client";
import {isDevUtil} from "#shared/utils/is-dev.util";
import configUtil from "#shared/utils/config.util";
import ms from "#shared/utils/ms.util";


export function saveSession(event: any, user: User): boolean {
    setCookie(event, 'userId', user.id, {
        httpOnly: isDevUtil(),
        maxAge: ms(configUtil<string>('COOKIE_MAX_AGE'))
    });

    return true;
}

export function deleteSession(event: any, user: User): boolean {
    setCookie(event, 'userId', user.id, {
        maxAge: 0
    })

    return true;
}

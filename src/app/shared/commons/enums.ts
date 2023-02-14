import { formatDate } from "@angular/common";

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export enum RouterNames {
    EMPTY = "",
    LOGIN = "login",
    PROFILE = "profile",
    RECORDS = "records",
    INCOME = "income",
    COST = "cost",
    SETTINGS = "settings",
    DASHBOARD = "dashboard",
    REGISTRATION = "registration"
};


export const MONTH_NAMES: string[] = [
    "Január",
    "Február",
    "Március",
    "Április",
    "Május",
    "Június",
    "Július",
    "Augusztus",
    "Szeptember",
    "Október",
    "November",
    "December"
];

export const MONTH_COLORS_IN_HEX: string[] = [
    "#023bf5",
    "#99c1e0",
    "#02cdf5",
    "#d9f502",
    "#b0f502",
    "#73f502",
    "#02f51e",
    "#46f285",
    "#f5c402",
    "#f5a802",
    "#028cf5",
    "#2207f0"
];

export const MINIMUM_YEAR: number = 2020;
export const MAXIMUM_YEAR: number = parseInt(formatDate(Date(), "yyyy", "en"))
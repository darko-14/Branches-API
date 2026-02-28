type ATMType = {
    id: string
    location: string
}

type CoordinatesType = {
    lat: number
    lon: number
}

type WorkingHoursType = {
    weekdays: string
    saturday: string
    sunday: string
}

export type Branch = {
    id: string
    name: string
    address: string
    city: string
    coordinates: CoordinatesType,
    workingHours: WorkingHoursType,
    phone: string;
    ATMs: ATMType[]
}

export type PaginatedBranchResponseDto = {
    items: Branch[];
    total: number;
    page?: number;
    limit?: number;
    hasPrev?: boolean;
    hasNext?: boolean;
}

export type BranchResponseDto = {
    items: Branch[];
    total: number;
}
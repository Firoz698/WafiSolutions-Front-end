export class Employee {
    constructor() {
        this.id = 0;
        this.firstName = "";
        this.lastName = "";
        this.image = null;
        this.email = "";
        this.mobile = "";
        this.dateOfBirth = new Date();
    }
    id: number;
    firstName: string;
    lastName: string;
    image: null;
    email: string;
    mobile: string;
    dateOfBirth: Date;
}

export class EmployeeFilter {
    constructor() {
        this.pageNo = 1;
        this.pageSize = 10;
        this.name = "";
        this.email = "";
        this.mobile = "";
        this.dateOfBirth = "";
    }
    pageNo: number;
    pageSize: number;
    name: string;
    email: string;
    mobile: string;
    dateOfBirth: string;
}
export class EmployeeResponseDto {
    constructor() {
        this.pageNo = 0;
        this.pageSize = 0;
        this.totalItems = 0;
        this.totalPages = 0;
        this.items = [];
    }
    pageNo: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    items: Employee[];
}
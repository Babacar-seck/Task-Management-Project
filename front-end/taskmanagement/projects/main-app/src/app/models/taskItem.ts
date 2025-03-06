export class TaskItem {
    constructor(
        public Id: number,
        public Name: string,
        public description: string,
        public dueDate: Date,
        public isCompleted: boolean,
        public userId: number
    ) {}
}
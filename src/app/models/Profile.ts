export class Profile {
    public firstName: string;
    public lastName: string;
    public coffeeOrTea: string;
    public description: string;
    public layout: string;

    public constructor(firstName: string='', lastName: string='', coffeeOrTea: string='1', 
            description: string='', chatLayout: string='1') {
        this.firstName = firstName;
        this.lastName = lastName;
        this.coffeeOrTea = coffeeOrTea;
        this.description = description;
        this.layout = chatLayout;
    }
}
import React, { Component } from 'react';
import List from './List';
import { DropdownButton, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';

class FilteredList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            typeFilter: "all",  // Filter by type
        };
    }

    // Handler to update search term
    onSearch = (event) => {
        this.setState({ search: event.target.value.toLowerCase() });
    };

    // Filter items based on search term
    filterItem = (item) => {
        return item.name.toLowerCase().includes(this.state.search);
    };

    // Handle dropdown select for type filter
    handleDropdownSelect = (type) => {
        this.setState({ typeFilter: type });
    };

    // Sort items by type (Fruits first, Vegetables next)
    sortItemsByType = (items) => {
        const fruitItems = items.filter(item => item.type === "Fruit");
        const vegetableItems = items.filter(item => item.type === "Vegetable");

        // Sort fruits and vegetables alphabetically by name
        fruitItems.sort((a, b) => a.name.localeCompare(b.name));
        vegetableItems.sort((a, b) => a.name.localeCompare(b.name));

        return [...fruitItems, ...vegetableItems];  // Combine fruits and vegetables
    };

    render() {
        // Filter the items based on search and type filter
        const filteredItems = this.props.items
            .filter(item => this.filterItem(item))
            .filter(item => {
                // If typeFilter is 'all', include all items
                return this.state.typeFilter === "all" || item.type.toLowerCase() === this.state.typeFilter;
            });

        // Sort the filtered items
        const sortedItems = this.sortItemsByType(filteredItems);

        return (
            <div className="filter-list">
                <h1>Produce Search</h1>

                {/* Dropdown for selecting type filter */}
                <DropdownButton id="typeDropdown" title={"Type"}>
                    <DropdownMenu>
                        <DropdownItem eventKey="all" onSelect={() => this.handleDropdownSelect("all")}>All</DropdownItem>
                        <DropdownItem eventKey="fruit" onSelect={() => this.handleDropdownSelect("Fruit")}>Fruit</DropdownItem>
                        <DropdownItem eventKey="vegetable" onSelect={() => this.handleDropdownSelect("Vegetable")}>Vegetable</DropdownItem>
                    </DropdownMenu>
                </DropdownButton>

                {/* Search input */}
                <input 
                    type="text" 
                    placeholder="Search" 
                    onChange={this.onSearch} 
                />

                {/* Display the sorted list of filtered items */}
                <List items={sortedItems} />
            </div>
        );
    }
}

export default FilteredList;

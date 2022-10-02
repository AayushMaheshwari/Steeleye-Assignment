- Frontend Engineer Assignment (Steeleye-Assignment)

Ques 1) Explain what the simple List component does.
     
     #  Lists are mainly used for displaying menus in a website.
     #  Here, List Component is used to display a unordered list of string given by user (items).
     #  WrappedList Component which is mentioned as Single List Component in comments. It has array of list (items) as argument (props).
     #  Using map, function does mapping to all items and display on the screen with a background color (either red or green).
     #  If user click on one of the list item, the color will change.
     
     
Ques 2) What problems / warnings are there with code?

     # onClick={onClickHandler(index)}. Here onClickHandler should be a function.
       onClick={() => onClickHandler(index)}
     # const [setSelectedIndex,selectedIndex] = useState(). setSelectedIndex and selectedIndex should be swapped.
       const [selectedIndex, setSelectedIndex] = useState();
     # isSelected={selectedIndex}. isSelected should be Boolean Variable.
       isSelected={Boolean(selectedIndex)}
     # Giving unique key to list item is missing.
       key={index}
     # items: PropTypes.array(
       PropTypes.shapeOf({
       //It is a Syntax error
       //array should be arrayOf & shapeOf should be shape
       items: PropTypes.arrayOf(
       PropTypes.shape({
       text: PropTypes.string.isRequired,
       })
       ),
       
       
Ques 3) Please fix, optimize, and/or modify the component as much as you think is necessary.

     # This solution is also available in code section. The file is App.js in src folder.
     
     # import React, { useState, useEffect, memo } from "react";
       import PropTypes from "prop-types";

       // Single List Item
       const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
       return (
       <li
       style={{ backgroundColor: isSelected ? "green" : "red" }}
       // onClick={onClickHandler(index)}
       // Here onClickHandler should be a function
       onClick={() => onClickHandler(index)}
       >
       {text}
       </li>
       );
       };

       WrappedSingleListItem.propTypes = {
       index: PropTypes.number,
       isSelected: PropTypes.bool,
       onClickHandler: PropTypes.func.isRequired,
       text: PropTypes.string.isRequired,
       };

       const SingleListItem = memo(WrappedSingleListItem);

       // List Component
       const WrappedListComponent = ({ items }) => {
       // const [setSelectedIndex,selectedIndex] = useState();
       // setSelectedIndex and selectedIndex should be swapped.
       const [selectedIndex, setSelectedIndex] = useState();

       useEffect(() => {
       setSelectedIndex(true);
       }, [items]);

       const handleClick = (index) => {
       setSelectedIndex(index);
       //console.log(index);
       };

       return (
       <ul style={{ textAlign: "left" }}>
       {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          // isSelected={selectedIndex}
          //isSelected should be Boolean Variable.
          isSelected={Boolean(selectedIndex)}
          //giving unique key to list item is missing.
          key={index}
        />
       ))}
       </ul>
       );
       };

       WrappedListComponent.propTypes = {
       // items: PropTypes.array(
       //   PropTypes.shapeOf({
       //It is a Syntax error
       //array should be arrayOf & shapeOf should be shape
       items: PropTypes.arrayOf(
       PropTypes.shape({
       text: PropTypes.string.isRequired,
       })
       ),
       };

       WrappedListComponent.defaultProps = {
       items: [
       { text: "Aayush", index: false },
       { text: "Maheshwari", index: false },
       ],
       };

       const List = memo(WrappedListComponent);

       export default List;

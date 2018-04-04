/**
 * Design System
 * The kitchen sink of all design components
 */
import * as alert from 'atoms/alert';
import * as branding from 'atoms/branding';
import * as breadcrumb from 'atoms/breadcrumb';
import * as button from 'atoms/button';
import * as dropdown from 'atoms/dropdown';
import * as grid from 'atoms/grid';
import * as image from 'atoms/image';
import * as icon from 'atoms/icon';
import * as listGroup from 'atoms/list-group';
import * as nav from 'molecules/nav';
import * as card from 'molecules/card';
import * as carousel from 'molecules/carousel';
import * as exampleWidget from 'molecules/example-widget';
import * as jumbotron from 'molecules/jumbotron';
import * as pagination from 'molecules/pagination';
import * as accordion from 'organisms/accordion';
import * as article from 'organisms/article';
import * as footer from 'organisms/footer';
import * as navbar from 'organisms/navbar';
import * as basicPage from 'templates/basic-page';

const components = {
  alert,
  branding,
  breadcrumb,
  button,
  dropdown,
  grid,
  image,
  icon,
  listGroup,
  nav,
  card,
  carousel,
  exampleWidget,
  jumbotron,
  pagination,
  accordion,
  article,
  footer,
  navbar,
  basicPage,
};
/**
 * Default export of object containing all components
 */
export default components;

/**
 * All component names as an array
 * @returns {Array} List of components name strings
 */
export const componentNames = () => Object.values(components).map(({ name }) => name);

/**
 * Enable all components against a piece of DOM with some settings
 */
export const enableAllComponents = ($dom, settings) =>
  Object.values(components).forEach(({ enable }) => enable($dom, settings));

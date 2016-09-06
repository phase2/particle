```scss
.class {
  transition: opacity $trans-opacity;
  &:hover {
    opacity: 0;
  }
}

.class {
  transition: left $trans-move;
  left: 0;
  &:hover {
    left: 100%;
  }
}
```

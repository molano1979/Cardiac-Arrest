# Cardiac Arrest

## Description

"An athlete wants to find difficult hills to run or ride in different areas."

Published: https://molano1979.github.io/Cardiac-Arrest/

```
"An athlete wants to find difficult hills to run or ride in different areas."
```

### First we begin with creating a google api map:

```javascript
map = new google.maps.Map(document.getElementById("map"), {
  zoom: 12,
  center: origin,
  mapTypeId: "terrain",
  streetViewControl: false,
});
```

### Marker's documentation was confusing to navigate.

```javascript
function addMarker(position) {
  if (markers.length == 0) {
    const marker = new google.maps.Marker({
      position,
      map,
      animation: google.maps.Animation.BOUNCE,
    });
    markers.push(marker);
```

## Strava api sample code:

```javascript
function getSegments(response) {
  const segmentsUrl = `https://www.strava.com/api/v3/segments/explore?bounds=${boundsArr}&activity_type=${activityType}&min_cat=${minClimb}&max_cat=${maxClimb}?access_token=${access_token}`;
  fetch(segmentsUrl, {
    method: "GET",
```

## Cards within javascript code

```html
<div class="col-sm this">
  <div class="card">
    <div class="card-body">
      <p><strong>${name}</strong></p>
      <div><img src="${profileC}" /></div>
      <p>Length of climb: ${climbL} feet.</p>
      <p>Average grade: ${avgGrade}%</p>
    </div>
  </div>
</div>
`;
```

## Modal examples from the app

```html
<div
  class="modal fade"
  id="exampleModalCenter"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalCenterTitle"
  aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">
          Cardiac Arrest Search Options
        </h5>

        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Activity type:
        <select id="activityType">
          <option value="running">Running</option>
          <option value="riding">Riding</option>
        </select>
        <br />
        Minimum climb rating:<input
          type="number"
          id="minClimb"
          value="2"
          min="2"
          max="4"
        />
        <br />
        Maximum climb rating:<input
          type="number"
          id="maxClimb"
          value="1"
          min="1"
          max="3"
        />
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          id="submit"
          onclick="hideFunction()"
        >
          Search and Close
        </button>
      </div>
    </div>
  </div>
</div>
```

### minimal styling

```css
.clear {
  background-color: #355c7d;
  border: none;
  border-radius: 4px;
  padding: 0.3em;
  color: white;
  transition: 0.2s;
}

.clear:hover {
  background-color: #f67280;
  color: white;
  border: none;
}
```

## App

![Quiz is progress](screen.png)

## Conclusion

Strava api limits your app without automatic refresh function.

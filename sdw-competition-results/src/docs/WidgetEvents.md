# 📡 Widget Event Callbacks

The widget supports several lifecycle and user interaction event callbacks. These allow the parent application to track user actions, trigger behaviors, and capture analytics.

## ✅ How to Use

To set up event handling, pass an `onClick*` or `onEvent` callback function as part of the `config` prop when initializing the widget:

```tsx
<Widget
  config={{
    apiKey: 'your-api-key',
    onClickTeam: (event, payload) => {
      console.log('Team clicked:', payload);
    },
    onEvent: (event, payload) => {
      console.log('Event triggered:', event, payload);
    },
  }}
/>
```

## 🧩 Event Reference

Event Name | Handler Prop | Description | Payload Example
unit_clicked | onClickUnit | Triggered when a unit is clicked. | { unitId: 'u123', name: 'Unit A' }
athlete_clicked | onClickAthlete | Triggered when an athlete is clicked. | { athleteId: 'a456', name: 'John Doe' }
team_clicked | onClickTeam | Triggered when a team is clicked. | { teamId: 't789', sport: 'soccer' }
organisation_clicked | onClickOrganisation | Triggered when an organization is clicked. | { orgId: 'org1', name: 'OrgX' }
outside_click | onClickOutside | Triggered when a user clicks outside the widget container. | undefined
widget_loaded | onEvent | Triggered when the widget is fully loaded. | { version: '1.2.3' }
data_loaded | onEvent | Triggered when widget data is loaded successfully. | { source: 'API', durationMs: 250 }
error_occurred | onEvent | Triggered when an error occurs inside the widget. | { code: 500, message: 'Internal Server Error' }
token_refreshed | onEvent | Triggered when the authentication token is refreshed. | { newToken: 'newTokenString' }
config_updated | onEvent | Triggered when the widget configuration is updated. | { diff: { language: 'en' }, timestamp: '2025-04-01' }

## 🧑‍💻 Common Use Cases

### Log Analytics:

You can easily integrate analytics tracking for every event:

```tsx
<Widget
  config={
    onEvent: (event, payload) => {
      sendAnalytics(event, payload); // Your analytics integration
    }
  }/>
```

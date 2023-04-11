## Tasks
```button
name New task
type command
action QuickAdd: Add task
```

```dataviewjs
await dv.view("taskido", {
pages: '"projects"',
dailyNoteFolder: "journal",
forward: true,
options: "noUnplanned noQuickEntry",
})
```

### Recurring
```tasks
not done
is recurring
```

### Backlog
```tasks
not done
status.name includes backlog
short mode
```

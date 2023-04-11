```button
name Previous
type command
action Daily notes: Open previous daily note
```
```button
name Next
type command
action Daily notes: Open next daily note
```
## Tracker
```simple-time-tracker
```
## Tasks

### Overdue
```tasks
not done
due before <% tp.file.creation_date("YYYY-MM-DD") %>
short mode
```

### For today
```tasks
not done
happens <% tp.file.creation_date("YYYY-MM-DD") %>
short mode
```

### Done today
```tasks
done <% tp.file.creation_date("YYYY-MM-DD") %>
short mode
```

## Notes
<% tp.user.pinNote() %>
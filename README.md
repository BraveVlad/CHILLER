# CHILLER
Chiller liquid-level Tracking App

# Concept
Chiller tracking system used for tracking cooling machine's liquid level and supply relevant statistics, such as usage and drain alerts.
This system allows factories and relevant customers to create a map for their cooling machines, track their cooling liquid level and manage preventative maintenance activities.

## Architecture

- [] Chiller: 
    - [] id
    - [] name
    - [] liquid max level
    - [] liquid min level
    - [] current liquid level
    - [] liquid type
    - [] last checked
    - [] ownership: User/Worker/Department


- [] Chiller Map object 
    - [] id
    - [] name
    - [] map layout: 2D array of Chillers

- [] Logs Manager 
    - [] Log
        - [] timestamp
        - [] id 
        - [] Chiller ID 
        - [] message 
        - [] initiator?
----------------------

## Tasks

- Chiller
    - [] Create chiller object
    - [] ability to modify chiller
    - [] ability to control chiller current liquid level
    - [] ability to represent chiller liquid level on a visual bar
    - [] ability to show list of relevant logs
    
- Chiller Map
    - [] Create a new map
    - [] edit map's layout - add / remove rows/columns
    - [] place chillers to map slots 
    - [] ability to drag-n-drop while editing.

- Tracker 
    - [] update a specific chiller with current liquid level
    - [] "refill" chiller method
    - [] log actions to log manager.
    - [] list of all logs by date.


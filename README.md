# urls-map-script
Importing urls as strings in csv files, parsing and processing them.

### Installation

Requires [Node.js](https://nodejs.org/) v8+ to run.

Install the dependencies:

```sh
$ cd urlsMapScript
$ npm install
```

### Run script with parameters:

```sh 
node index.js <path_to_redirections>.csv <path_to_mapping_rules>.csv <path_to_excluded_urls>.csv
```
  - `<path_to_redirections>.csv` - required
  File format: 
    > example_com/something/to/redirect/one
    > example_com/something/to/redirect/two  
    > example_com/something/to/redirect/three
  
  - `<path_to_mapping_rules>.csv` - required
  File format: 
    > old;new
    > old/path/one;new/path/one
    > old/path/two;new/path/two
    > old/path/three;new/path/three
  - `<path_to_excluded_urls>.csv` - optional parameter 

### Output

Output is generated to `redirections.csv` file.


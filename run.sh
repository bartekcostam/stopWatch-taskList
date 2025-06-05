#!/bin/bash

# Ensure npm dependencies are installed
npm install

# Display menu
PS3="Select an option: "
options=("Start application" "Run tests" "Quit")
select opt in "${options[@]}"; do
  case $REPLY in
    1)
      echo "Starting application on http://localhost:8080"
      npx http-server -p 8080 &
      server_pid=$!
      read -p "Press Enter to stop the server..." dummy
      kill $server_pid
      break
      ;;
    2)
      echo "Running tests..."
      npm test
      ;;
    3)
      echo "Exiting..."
      break
      ;;
    *)
      echo "Invalid option";
      ;;
  esac
done

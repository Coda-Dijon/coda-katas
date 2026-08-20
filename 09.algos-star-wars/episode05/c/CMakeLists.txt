cmake_minimum_required(VERSION 4.0)
project(planets C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(planets
        planets.c
        planets.h
        main.c)

# unit tests
add_executable(planets_tests
        test_planets.c
        planets.c
        planets.h
)

cmake_minimum_required(VERSION 4.0)
project(findPlanet C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(findPlanet
        findPlanet.c
        findPlanet.h
        main.c)

# unit tests
add_executable(findPlanet_tests
        test_findPlanet.c
        findPlanet.c
        findPlanet.h
)

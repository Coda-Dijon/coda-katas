cmake_minimum_required(VERSION 4.0)
project(jediNames C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(jediNames
        jediNames.c
        jediNames.h
        main.c)

# unit tests
add_executable(jediNames_tests
        test_jediNames.c
        jediNames.c
        jediNames.h
)

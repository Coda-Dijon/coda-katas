cmake_minimum_required(VERSION 4.0)
project(droidStack C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(droidStack
        droidStack.c
        droidStack.h
        main.c)

# unit tests
add_executable(droidStack_tests
        test_droidStack.c
        droidStack.c
        droidStack.h
)

cmake_minimum_required(VERSION 4.0)
project(lokiCode C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(lokiCode
        lokiCode.c
        lokiCode.h
        main.c)

# unit tests
add_executable(lokiCode_tests
        test_lokiCode.c
        lokiCode.c
        lokiCode.h
)

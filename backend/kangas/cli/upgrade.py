#!/usr/bin/env python
# -*- coding: utf-8 -*-
######################################################
#     _____                  _____      _     _      #
#    (____ \       _        |  ___)    (_)   | |     #
#     _   \ \ ____| |_  ____| | ___ ___ _  _ | |     #
#    | |  | )/ _  |  _)/ _  | |(_  / __) |/ || |     #
#    | |__/ ( ( | | | ( ( | | |__| | | | ( (_| |     #
#    |_____/ \_||_|___)\_||_|_____/|_| |_|\____|     #
#                                                    #
#    Copyright (c) 2022 Kangas Development Team      #
#    All rights reserved                             #
######################################################

import argparse
import os
import shutil
import sys

ADDITIONAL_ARGS = False


def get_parser_arguments(parser):
    parser.add_argument(
        "FILENAMES",
        nargs="+",
        help=("The filename of the DataGrid to upgrade"),
        type=str,
    )


def upgrade(parsed_args, remaining=None):
    # Called via `kangas upgrade ...`
    try:
        upgrade_cli(parsed_args)
    except KeyboardInterrupt:
        print("Canceled by CONTROL+C")
    except Exception as exc:
        print("ERROR: " + str(exc))


def upgrade_cli(parsed_args):
    from kangas import DataGrid

    for filename in parsed_args.FILENAMES:
        filename = os.path.expanduser(filename)
        if os.path.isfile(filename):
            print("Making backup: %r" % (filename + ".backup"))
            shutil.copyfile(filename, (filename + ".backup"))
            datagrid = DataGrid.read_datagrid(filename)
            print("Upgrading: %r" % filename)
            datagrid.upgrade()
    print("Done!")


def main(args):
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    get_parser_arguments(parser)
    parsed_args = parser.parse_args(args)
    upgrade(parsed_args)


if __name__ == "__main__":
    # Called via `python -m kangas.cli.upgrade ...`
    main(sys.argv[1:])